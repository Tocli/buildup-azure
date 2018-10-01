using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using IPCS.Entities;

namespace IPCS.Models
{
    public class ReactivateAccountModel : IValidated
    {
        [Required]
        [MaxLength(128)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
