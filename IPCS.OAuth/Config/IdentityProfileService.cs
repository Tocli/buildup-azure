using System;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using IPCS.Entities;
using IdentityServer4.Extensions;
using System.Linq;
using System.Security.Claims;

namespace IPCS.OAuth.Config
{
    public class IdentityProfileService : IProfileService
    {

        private readonly IUserClaimsPrincipalFactory<User> claimsFactory;
        private readonly UserManager<User> userManager;


        public IdentityProfileService(IUserClaimsPrincipalFactory<User> claimsFactory, UserManager<User> userManager)
        {
            this.claimsFactory = claimsFactory;
            this.userManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
			var user = await this.userManager.FindByIdAsync(sub);
			if (user == null)
			{
				throw new ArgumentException("");
			}

			var principal = await this.claimsFactory.CreateAsync(user);
            var claims = principal.Claims.ToList();
            claims.Add(new Claim(ClaimTypes.Sid, sub));
            //Add more claims like this
            var roles = await userManager.GetRolesAsync(user);
            foreach (var rol in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, rol));
            }

            context.IssuedClaims = claims;        
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
			var sub = context.Subject.GetSubjectId();
			var user = await this.userManager.FindByIdAsync(sub);
			context.IsActive = user != null;        
        }
    }
}
