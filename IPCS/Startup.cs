using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using IPCS.Services;
using IPCS.Repositories;
using IPCS.Auth;
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
using IPCS.Config;
using IPCS.Test;
using IPCS.OAuth.Repositories.Context;
using IPCS.OAuth.Repositories;
using IPCS.OAuth.Services;
using IPCS.Generic.Services.Email;
using IPCS.Services.Emails;
using Microsoft.Extensions.Localization;
using Folke.Localization.Json;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http;

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
                        options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Local;
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


            services.AddDbContext<IPCS.Repositories.Context.IPCSContext>(options =>
            {
                var defautlConnection = Configuration.GetConnectionString("Default");
				options.UseSqlServer(Configuration.GetConnectionString(defautlConnection),
										b => b.MigrationsAssembly(("IPCS.Repositories")));           
            });

            services.AddDbContext<IPCSOAuthContext>(options =>
			{
				var defautlConnection = Configuration.GetConnectionString("DefaultOAuth");
				options.UseSqlServer(Configuration.GetConnectionString(defautlConnection),
										   b => b.MigrationsAssembly(("IPCS.OAuth.Repositories")));
			});


            services.AddAuthorization(options =>
            {
                options.AddPolicy("User", policy =>
                {
                    policy.RequireRole("ROLE_USER");
                    policy.AddAuthenticationSchemes("Bearer");
                });

                options.AddPolicy("Client", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.AddAuthenticationSchemes("Bearer");
                });


            });

            var passwordOptions = Configuration.GetSection("PasswordOptions");
            //Configuration
            services.Configure<IdentityOptions>(options =>
               {
                   // Password settings
                   options.Password.RequireDigit = passwordOptions.GetValue<bool>("RequireDigit");
                   options.Password.RequiredLength = passwordOptions.GetValue<int>("RequiredLength");
                   options.Password.RequireNonAlphanumeric = passwordOptions.GetValue<bool>("RequireNonAlphanumeric");
                   options.Password.RequireUppercase = passwordOptions.GetValue<bool>("RequireUppercase");
                   options.Password.RequireLowercase = passwordOptions.GetValue<bool>("RequireLowercase");

                   // Lockout settings
                   options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(passwordOptions.GetValue<double>("DefaultLockoutTimeSpan"));
                   options.Lockout.MaxFailedAccessAttempts = passwordOptions.GetValue<int>("MaxFailedAccessAttempts");

                   // User settings
                   options.User.RequireUniqueEmail = passwordOptions.GetValue<bool>("RequireUniqueEmail");
               });

            services.AddIdentity<User, IdentityRole>(config =>
            {
                config.SignIn.RequireConfirmedEmail = true;
            })
            .AddEntityFrameworkStores<IPCSOAuthContext>()
			.AddDefaultTokenProviders();

            services.AddJsonLocalization(options =>
            {
                options.ResourceFilesDirectory = "Resources";
            });

            services.AddTransient<IEmailSender, AuthMessageSender>();

            services.AddScoped<IStringLocalizer, JsonStringLocalizer>();

			//Repository
			services.AddScoped<IBudgetRepository, BudgetRepository>();
            services.AddScoped<IActivityTypeRepository, ProjectActivityTypeRepository>();
            services.AddScoped<ICurrencyRepository, CurrencyRepository>();
            services.AddScoped<IEntityRepository, EntityRepository>();
            services.AddScoped<IProjectActivityRepository, ProjectActivityRepository>();
            services.AddScoped<IProjectCertificationRepository, ProjectCertificationRepository>();
            services.AddScoped<IProjectContactRepository, ProjectContactRepository>();
            services.AddScoped<IProjectDailyReportRepository, ProjectDailyReportRepository>();
            services.AddScoped<IProjectInformationRepository, ProjectInformationRepository>();
            services.AddScoped<IProjectLocationRepository, ProjectLocationRepository>();
            services.AddScoped<IProjectOrderRepository, ProjectOrderRepository>();
            services.AddScoped<IProjectPropertyRepository, ProjectPropertyRepository>();
            services.AddScoped<IProjectStatusRepository, ProjectStatusRepository>();
            //services.AddScoped<IProjectWeatherRepository, ProjectWeatherRepository>();
            services.AddScoped<IWeatherConditionRepository, WeatherConditionRepository>();
            services.AddScoped<IRecoverPasswordRepository, RecoverPasswordRepository>();
            services.AddScoped<IUserReporsitory, UserRepository>();
            services.AddScoped<ICountryRepository, CountryRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<IStateRepository, StateRepository>();
            //services.AddScoped<IProjectSafetyRepository, ProjectSafetyRepository>();
            //services.AddScoped<IProjectCriticalPathRepository, ProjectCriticalPathRepository>();
            services.AddScoped<ISafetyIssueRepository, SafetyIssueRepository>();
            services.AddScoped<IProjectDailyReportRepository, ProjectDailyReportRepository>();


            //Services
            services.AddScoped<IBudgetService, BudgetService>();
            services.AddScoped<IActivityTyperService, ActivityTypeService>();
            services.AddScoped<ICurrencyService, CurrencyService>();
            services.AddScoped<IEntityService, EntityService>();
            services.AddScoped<IProjectActivityService, ProjectActivityService>();
            services.AddScoped<IProjectCertificationService, ProjectCertificationService>();
            services.AddScoped<IProjectContactService, ProjectContactService>();
            services.AddScoped<IProjectDailyReportService, ProjectDailyReportService>();
            services.AddScoped<IProjectInformationService, ProjectInformationService>();
            services.AddScoped<IProjectLocationService, ProjectLocationService>();
            services.AddScoped<IProjectOrderService, ProjectOrderService>();
            services.AddScoped<IProjectPropertyService, ProjectPropertyService>();
            services.AddScoped<IProjectStatusService, ProjectStatusService>();
            //services.AddScoped<IProjectWeatherService, ProjectWeatherService>();
            services.AddScoped<IWeatherConditionService, WeatherConditionService>();
            services.AddScoped<IRecoverPasswordService, RecoverPasswordService>();
            services.AddScoped<ILocationDataService, LocationDataService>();
            //services.AddScoped<IProjectSafetyService, ProjectSafetyService>();
            //services.AddScoped<IProjectCriticalPathService, ProjectCriticalPathService>();
            services.AddScoped<ISafetyIssueService, SafetyIssueService>();
            services.AddScoped<IProjectDailyReportService, ProjectDailyReportService>();

            // Add framework services.
            //services.AddScoped<IClaimsTransformer, Auth.ClaimsTransformer>();
            //services.AddScoped<ICustomTokenRequestValidator, CustomTokenRequestValidator>();


            services.Configure<Config.PasswordOptions>(Configuration);
			services.Configure<Config.UseIdentityServerAuthenticationOptions>(Configuration);
			//services.Configure<Config.GeneralOptions>(Configuration);
			services.Configure<GeneralOptions>(options => Configuration.GetSection("GeneralOptions").Bind(options));


			var emailConfigOptions = new EmailConfigOptions();
			Configuration.GetSection("EmailConfigOptions").Bind(emailConfigOptions);

            services.EmailConfigOptions(options => {
                options.SmtpPort = emailConfigOptions.SmtpPort;
                options.SmtpUri = emailConfigOptions.SmtpUri;
                options.From = emailConfigOptions.From;
                options.FromEmail = emailConfigOptions.FromEmail;
                options.LocalDomain = emailConfigOptions.LocalDomain;
                options.SmtpPassword = emailConfigOptions.SmtpPassword;
            });

			

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
                              ILoggerFactory loggerFactory, IPCS.Repositories.Context.IPCSContext context,
                              UserManager<User> userManager)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddFile(Configuration.GetSection("LoggingFile"));
            
            loggerFactory.AddDebug();

            if (string.IsNullOrWhiteSpace(env.WebRootPath))
            {
                env.WebRootPath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            UseIdentityServerAuthenticationOptions opt = new UseIdentityServerAuthenticationOptions();
            Configuration.GetSection("UseIdentityServerAuthenticationOptions").Bind(opt);

            app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
            {
                Authority = opt.Authority,
                ApiName = opt.ApiName,
                RequireHttpsMetadata = opt.RequireHttpsMetadata,
                AutomaticAuthenticate = opt.AutomaticAuthenticate,
                AutomaticChallenge = opt.AutomaticChallenge,
                RoleClaimType = ClaimTypes.Role,
                EnableCaching = opt.EnableCaching,
                AuthenticationScheme = opt.AuthenticationScheme,
                SupportedTokens = IdentityServer4.AccessTokenValidation.SupportedTokens.Jwt,
                JwtBearerEvents = new CustomJwtBearerEvents()

            });            

            app.UseCors("CorsPolicy");

            app.UseMvc();


            var pathUploadProjectFolder = Path.Combine(env.WebRootPath, "upload", "project");
            if (!Directory.Exists(pathUploadProjectFolder))
            {
                Directory.CreateDirectory(pathUploadProjectFolder);
            }

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(env.WebRootPath, "upload", "project")),
                RequestPath = new PathString("/project")
            });

           DBInitialize.Seed(context, userManager,Configuration.GetValue<bool>("SEED"));



        }



        class CustomJwtBearerEvents : JwtBearerEvents
        {

            public override System.Threading.Tasks.Task AuthenticationFailed(AuthenticationFailedContext context)
            {
                var authFailed = base.AuthenticationFailed(context);
                if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                {
                    context.Response.Headers.Add("Auth-Error", "token_expired");
                }

                return authFailed;
            }

            public override System.Threading.Tasks.Task TokenValidated(TokenValidatedContext context)
            {

                return base.TokenValidated(context);
            }

            public override System.Threading.Tasks.Task Challenge(JwtBearerChallengeContext context)
            {
                return base.Challenge(context);
            }

        }
    }

	public static class GreetingServiceCollectionExtensions
	{
		public static IServiceCollection EmailConfigOptions(this IServiceCollection collection,
                                                         Action<EmailConfigOptions> setupAction)
		{
			if (collection == null) throw new ArgumentNullException(nameof(collection));
			if (setupAction == null) throw new ArgumentNullException(nameof(setupAction));

			collection.Configure(setupAction);
            return collection.AddTransient<IEmailSender, AuthMessageSender>();
		}
	}


}
