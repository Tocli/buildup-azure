using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.ComponentModel;
using IPCS.Entities;

namespace IPCS.Models
{
    public class RegisterUserRquestModel : IValidated
    {
        [Required]
        [MinLength(2)]
        [MaxLength(64)]
        [DisplayName("First Name")]
        public string FirstName { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(64)]
        public string LastName { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(128)]
        [RegularExpression("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$", ErrorMessage = "{0} is not valid email address")]
        public string Email { get; set; }

        [Required]
        [MaxLength(128)]
        [Compare("Email")]
        public string ReEnterEMail { get; set; }

        [Required]
        [MaxLength(128)]
        [MinLength(8)]
        public string Password { get; set; }

        [Required]
        [MaxLength(128)]
        [MinLength(8)]
        [Compare("Password")]
        public string ReEnterPassword { get; set; }

    }
}
