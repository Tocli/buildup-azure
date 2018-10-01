using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using IPCS.Entities;

namespace IPCS.Models
{
    public class ResetPasswordRequestModel : IValidated
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ReEnterPassword { get; set; }

        [Required]
        public string Hash { get; set; }
        
    }
}
