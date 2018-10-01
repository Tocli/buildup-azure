using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using IPCS.Entities;

namespace IPCS.Models
{
    public class ChangeMyDataRequestModel : IValidated
    {
        [Required]
        [MaxLength(64)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(64)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(64)]
        public string PhoneNumber { get; set; }

    }
}
