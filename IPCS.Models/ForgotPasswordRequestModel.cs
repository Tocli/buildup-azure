using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using IPCS.Entities;

namespace IPCS.Models
{
    public class ForgotPasswordRequestModel : IRecaptchaRequestModel, IValidated
    {
        [Required]
        [MaxLength(128)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public string Captcha { get; set; }

        public string getRecaptchaResponse()
        {
            return Captcha;
        }
    }
}
