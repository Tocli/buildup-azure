using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using IPCS.Models;
using IPCS.OAuth.Services;
using IdentityServer4.Extensions;
using IPCS.Generic.Services.Email;
using IPCS.Entities;
using IPCS.Config;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Localization;
using System.Text;
using IPCS.Filters;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize("Client")]
    public class AccountController : BaseController
    {
        private readonly UserManager<IPCS.Entities.User> userManager;
        private readonly SignInManager<IPCS.Entities.User> signInManager;

        //private readonly IEmailSender emailSender;
        //private readonly ISmsSender _msSender;
        private readonly ILogger logger;
        private IRecoverPasswordService recoverPasswordService;
        private readonly IEmailSender emailSender;
        private GeneralOptions generalOptions;
        private readonly IStringLocalizer<AccountController> localizer;
        private readonly IHostingEnvironment env;
        public AccountController(
            UserManager<IPCS.Entities.User> userManager,
            SignInManager<IPCS.Entities.User> signInManager,

            //IEmailSender emailSender,
            //ISmsSender smsSender,
            ILoggerFactory loggerFactory,
            IRecoverPasswordService recoverPasswordService,
            IEmailSender emailSender,
            IOptions<GeneralOptions> generalOptions,
            IStringLocalizer<AccountController> localizer,
            IHostingEnvironment env)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            //this.emailSender = emailSender;
            //this.smsSender = smsSender;
            this.logger = loggerFactory.CreateLogger<AccountController>();
            this.recoverPasswordService = recoverPasswordService;
            this.emailSender = emailSender;
            this.generalOptions = generalOptions.Value;
            this.localizer = localizer;
            this.env = env;
        }

        [Recaptcha()]
        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordRequestModel request)
        {



            var user = await this.userManager.FindByNameAsync(request.Email);
            if (user == null) {
                return BadRequest(localizer.GetString("errors.user_not_found"));
            }

            var recover = new IPCS.Entities.RecoverPassword
            {
                RecoverDate = DateTime.Now.Add(TimeSpan.FromDays(1)),
                Hash = Guid.NewGuid().ToString(),
                Used = false,
                UserId = user.Id
            };

            this.recoverPasswordService.Insert(recover);
            string callBack = $"{this.generalOptions.BaseWebAppUrl}resetPassword/{recover.Hash}";
            string emailFile = localizer.GetString("emails.forgotpassword_src");
            string path = $"{Directory.GetCurrentDirectory()}{emailFile}";
            
            this.emailSender.SendEmail(user.Email, "Reset Password", path, new Dictionary<string, string> { { "callback", callBack },{ "username", $"{user.FirstName}"  }, { "host", this.generalOptions.BaseEmailsImage } });
			return Ok();

        }

        [HttpGet("forgotpassword/valid/{guid}")]
        public IActionResult ForgotPasswordValid(string guid)
        {
            var user = this.recoverPasswordService.ValidateHashAndGetUser(guid);
            if (user == null)
            {
                return BadRequest(localizer.GetString("errors.forgotpassword_invalidlink"));
            }

            return Ok();
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordRequestModel changePassword)
        {

            var user = this.recoverPasswordService.ValidateHashAndGetUser(changePassword.Hash);
            if (user == null)
            {
                return BadRequest(localizer.GetString("errors.forgotpassword_invalidlink"));
            }
            var token = await this.userManager.GeneratePasswordResetTokenAsync(user);
            var result = await this.userManager.ResetPasswordAsync(user,token, changePassword.Password);
          
            if (result.Succeeded)
            {
                await this.userManager.SetLockoutEndDateAsync(user, DateTime.Now);
                recoverPasswordService.ValidateHashAndGetUserAndDisable(changePassword.Hash);
                return Ok();
            }
			var resultString = new StringBuilder();
			foreach (var item in result.Errors)
			{
				resultString.AppendLine(item.Description);
			}
			return BadRequest(resultString.ToString());
        }

		[HttpPost("changepassword")]
        [Authorize("User")]
		public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordRequestModel changePassword)
		{

            var user = await this.userManager.FindByIdAsync(User.GetSubjectId());
            var result = await this.userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.Password);

			if (result.Succeeded)
			{				
				return Ok();
			}

            var resultString = new StringBuilder();
            foreach (var item in result.Errors)
            {
                resultString.AppendLine(item.Description);
            }
            return BadRequest(resultString.ToString());
		}


		[HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterUserRquestModel request)
        {
            var userExist = await this.userManager.FindByNameAsync(request.Email);
            if (userExist == null)
            {
                var user = new IPCS.Entities.User
                {
                    UserName = request.Email,
                    Email = request.Email,
                    LastName = request.LastName,
                    FirstName = request.FirstName,
                    PhoneNumber = request.PhoneNumber,
                    Valid = true
                };
                var result = await this.userManager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    var identityResult = await this.userManager.AddToRoleAsync(user, "ROLE_USER");
                    SendEmailActivateAccount(user);
                    this.logger.LogInformation(3, "User created a new account with password.");
                    return Ok();
                }

				var resultString = new StringBuilder();
				foreach (var item in result.Errors)
				{
					resultString.AppendLine(item.Description);
				}
                return BadRequest(resultString.ToString());

            }
            return BadRequest(localizer.GetString("errors.user_registered"));
        }

        private void SendEmailActivateAccount(User user)
        {
            string token = Guid.NewGuid().ToString();
            string callBack = $"{this.generalOptions.BaseWebAppUrl}account-activate/{token}";

            string emailFile = localizer.GetString("emails.welcome_src");
            string path = $"{Directory.GetCurrentDirectory()}{emailFile}";
            this.emailSender.SendEmail(user.Email, "Activate Account", path, new Dictionary<string, string> { { "callback", callBack },
                { "username", $"{user.FirstName}" }, {"host", this.generalOptions.BaseEmailsImage }});
            //this.emailSender.SendEmailAsync(user.Email, "Activate Account", $"{callBack}", true);
			var recover = new IPCS.Entities.RecoverPassword
			{
				RecoverDate = DateTime.Now.Add(TimeSpan.FromDays(1)),
				Hash = token,
				Used = false,
				UserId = user.Id
			};

			this.recoverPasswordService.Insert(recover);

		}

        [HttpGet("activate-account/{guid}")]
        public async Task<IActionResult> ActivateAccount(string guid){
            var user = this.recoverPasswordService.ValidateHashAndGetUserAndDisable(guid);
            if(user == null){
				return BadRequest(localizer.GetString("errors.reactivate_invalidlink"));
			}

            var token = await this.userManager.GenerateEmailConfirmationTokenAsync(user);
            await this.userManager.ConfirmEmailAsync(user, token);

            return Ok();
		}

        [HttpPost("reactivateaccount")]
        public async Task<IActionResult> Reactivate([FromBody]ReactivateAccountModel request)
        {
            var user = await this.userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
				return BadRequest(localizer.GetString("errors.user_not_found"));
			}

            if (user.EmailConfirmed == true)
            {
				return BadRequest(localizer.GetString("errors.email_already_confirmed"));
			}

            SendEmailActivateAccount(user);
            this.logger.LogInformation("Email User: ", user);
            return Ok();
        }

        [HttpGet("userprofile")]
        [Authorize("User")]
        public async Task<IActionResult> GetUser()
        {
            var userPrincipal = User;
            GetUserProfileResponseModel response = new GetUserProfileResponseModel();
            var user = await this.userManager.FindByIdAsync(userPrincipal.GetSubjectId());
            response.FirstName = user.FirstName;
            response.LastName = user.LastName;
            response.PhoneNumber = user.PhoneNumber;
            response.UserName = user.UserName;
            return new ObjectResult(response);
        }

        [HttpPost("savemyprofile")]
        [Authorize("User")]
        public async Task<IActionResult> SaveMyProfile([FromBody]ChangeMyDataRequestModel userProfileRequestModel){
			var userPrincipal = User;
			if (userPrincipal == null)
			{
				return Unauthorized();
			}

            var user = await this.userManager.FindByIdAsync(userPrincipal.GetSubjectId());
            user.FirstName = userProfileRequestModel.FirstName;
            user.LastName = userProfileRequestModel.LastName;
            user.PhoneNumber = userProfileRequestModel.PhoneNumber;

            await this.userManager.UpdateAsync(user);
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return NotFound();
        }

        [HttpPost("delete")]
        public IActionResult Delete([FromBody]List<int> id)
        {
            return NotFound();
        }

        [HttpPost("list")]
        public IActionResult Post([FromBody]List<User> value)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public IActionResult Put([FromBody]List<User> user)
        {
            return NotFound();
        }



    }
}
