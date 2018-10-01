using System;
using Microsoft.AspNetCore.Http;
using IPCS.Generic.Services.Email;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit.IO;
using System.Collections.Generic;
using System.IO;

namespace IPCS.Services.Emails
{
    public class AuthMessageSender : IEmailSender
    {
        private readonly EmailConfigOptions options;

        public AuthMessageSender(IOptions<EmailConfigOptions> options)
        {
            this.options = options.Value;
        }

        public void SendEmail(string email, string subject, string resourceFile, Dictionary<string, string> parameters)
        {
            var text = File.ReadAllText(resourceFile);
            foreach (var item in parameters.Keys)
            {
                text = text.Replace("{{" + item + "}}", parameters[item]);
            }

            this.SendEmailAsync(email, subject, text, true);
        }

        public void SendEmailAsync(string email, string subject, string message, bool isHtml = true)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(this.options.From, this.options.FromEmail));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;

            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message };

            using (var client = new SmtpClient())
            {
                //client.LocalDomain = this.options.LocalDomain;
                System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(this.options.FromEmail, this.options.SmtpPassword);
                client.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback((sender, certificate, ChainedStream, sslPolicy) =>
                {
                    return true;
                });
                client.Connect(this.options.SmtpUri, this.options.SmtpPort, SecureSocketOptions.StartTls);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(credentials);

                client.Send(emailMessage);
                client.Disconnect(true);
            }
        }
    }
}
