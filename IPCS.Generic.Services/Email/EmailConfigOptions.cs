using System;
namespace IPCS.Generic.Services.Email
{
    public class EmailConfigOptions
    {

        public string From { get; set; }

        public string FromEmail { get; set; }

        public string LocalDomain { get; set; }

        public string SmtpUri { get; set; }

        public int SmtpPort { get; set; }

        public string SmtpPassword { get; set; }

        public EmailConfigOptions()
        {
        }
    }
}
