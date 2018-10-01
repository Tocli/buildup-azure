using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IPCS.Generic.Services.Email
{
    public interface IEmailSender
    {
        void SendEmailAsync(string email, string subject, string message, bool isHtml = true);

        void SendEmail(string email, string subject, string resource, Dictionary<string,string> parameters);
    }
}
