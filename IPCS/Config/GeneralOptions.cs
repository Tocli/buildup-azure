using System;
namespace IPCS.Config
{
    public class GeneralOptions
    {
        public string BaseWebAppUrl { get; set; }

        public string BaseEmailsImage { get; set; }

        public Recaptcha Recaptcha { get; set; }

        public GeneralOptions()
        {
        }
    }

    public class Recaptcha{

        public string SiteKey { get; set; }

        public string SecretKey { get; set; }

        public string Url { get; set; }

        public Recaptcha(){
            
        }
    }
}
