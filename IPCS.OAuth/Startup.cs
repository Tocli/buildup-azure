using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using IPCS.Repositories;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IPCS.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.Services;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IO;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using IPCS.OAuth.Database;
using IPCS.OAuth.Config;
using IPCS.OAuth.Repositories.Context;
using System.Threading.Tasks;
using IdentityServer4.ResponseHandling;
using IdentityServer4.Models;
using IdentityServer4.Extensions;
using IdentityServer4.Configuration;
using System.Collections.Generic;
using IdentityServer4.AspNetIdentity;

namespace IPCS
{
    public class Startup
    {


        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.AddMvc(options => { })
                    .AddJsonOptions(options =>
                    {
                        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });


            services.AddDbContext<IPCSOAuthContext>(options =>
            {
                var defautlConnection = Configuration.GetConnectionString("Default");
                options.UseSqlServer(Configuration.GetConnectionString(defautlConnection),
                                         b => b.MigrationsAssembly(("IPCS.OAuth.Repositories")));
            });


            var identityOption = new IPCS.OAuth.Config.IdentityOption();
            Configuration.GetSection("IdentityOption").Bind(identityOption);

            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Lockout = new LockoutOptions{
                    MaxFailedAccessAttempts = Configuration.GetValue<int>("IdentityOption:Login:MaxFailedAccessAttempts"),
                    DefaultLockoutTimeSpan = TimeSpan.FromDays(Configuration.GetValue<int>("IdentityOption:Login:DefaultLockoutTimeSpan"))
                };
            })
            .AddEntityFrameworkStores<IPCSOAuthContext>()
            .AddDefaultTokenProviders();



            X509Certificate2 cert = new X509Certificate2("./server.pfx", "1234", X509KeyStorageFlags.MachineKeySet |
                                                         X509KeyStorageFlags.PersistKeySet |
                                                         X509KeyStorageFlags.Exportable);

            services.AddIdentityServer()
                    .AddSigningCredential(cert)
                    .AddInMemoryApiResources(IPCS.OAuth.Config.Config.GetApiResources(identityOption.ApiResources))
                    .AddInMemoryClients(IPCS.OAuth.Config.Config.GetClients(identityOption.Clients))
                    .AddAspNetIdentity<User>()
                    .AddCustomTokenRequestValidator<CustomTokenRequestValidator>()
                    .AddProfileService<IPCS.OAuth.Config.IdentityProfileService>()
                    .AddResourceOwnerValidator<CustomResourceOwnerValidator>();

            

            services.Configure<IISOptions>(options =>
            {
                options.ForwardWindowsAuthentication = true;
            });

            services.AddMvc();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
                              ILoggerFactory loggerFactory, IPCSOAuthContext context,UserManager<User> userManager)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddFile(Configuration.GetSection("LoggingFile"));
            loggerFactory.AddDebug();

            app.UseIdentity();
            app.UseIdentityServer();

            app.UseCors("CorsPolicy");
            app.UseMvc();
            DBInitialize.Seed(context, userManager);
        }

    }

    class CustomTokenRequestValidator : ICustomTokenRequestValidator{

        private readonly UserManager<User> manager;

        public CustomTokenRequestValidator(UserManager<User> manager){
            this.manager = manager;
        }

        public async Task ValidateAsync(CustomTokenRequestValidationContext context)
        {
            if(context.Result.ValidatedRequest.Subject != null){
                var user = await manager.FindByIdAsync(context.Result.ValidatedRequest.Subject.GetSubjectId());
				if (!user.EmailConfirmed)
				{
                    context.Result.Error = "not_confirmed";
					context.Result.ErrorDescription = "Account is not confirmed";
					context.Result.IsError = true;
				}
            }

        }
    }

    class CustomResourceOwnerValidator : ResourceOwnerPasswordValidator<User>
    {
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        public CustomResourceOwnerValidator(UserManager<User> userManager, SignInManager<User> signInManager, ILogger<ResourceOwnerPasswordValidator<User>> logger) : base(userManager, signInManager, logger)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        public override async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            var result = new GrantValidationResult{
                IsError = false
            };
            var user = await userManager.FindByNameAsync(context.UserName);
            if(user == null){                
                result.IsError = true;
                result.Error = "invalid_grant";
                result.ErrorDescription = "invalid_username_or_password";
                context.Result = result;
            } else {
            				
				var siginResult = await this.signInManager.PasswordSignInAsync(user, context.Password, false, true);
                if(siginResult == SignInResult.Success){
					await base.ValidateAsync(context);
					result = context.Result;
				}
                else if(siginResult == SignInResult.Failed){
                    result.Error = "invalid_grant";
                    result.ErrorDescription = "invalid_username_or_password";
                    result.IsError = true;
                }
                else if(siginResult == SignInResult.LockedOut){
                    result.Error = "invalid_grant";
                    result.ErrorDescription = "Your account is locked, click on Forgot my password";
                    result.IsError = true;
				}

            }

            context.Result = result;

        }
    }



}
