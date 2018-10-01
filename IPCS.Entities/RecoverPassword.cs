using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("RecoverPasswords")]
    public class RecoverPassword : BaseEntity
    {
        [Required]
        public DateTime RecoverDate { get; set; }

        [Required]
        [MaxLength(128)]
        public string Hash { get; set; }

        [Required]
        public Boolean Used { get; set; }

        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
