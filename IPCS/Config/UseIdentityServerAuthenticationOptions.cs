using System;
namespace IPCS.Config
{
    public class UseIdentityServerAuthenticationOptions
    {

        public string Authority { get; set; }

        public string ApiName { get; set; }

        public bool RequireHttpsMetadata { get; set; }

        public bool AutomaticAuthenticate { get; set; }

        public bool AutomaticChallenge { get; set; }

        public bool EnableCaching { get; set; }

        public string AuthenticationScheme { get; set; }

        public UseIdentityServerAuthenticationOptions()
        {
        }
    }
}
