using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("ProjectProperties")]
    public class ProjectProperty : BaseEntity,IValidated
    {
        [Required]
        [MaxLength(32)]
        public string Field { get; set; }

        [Required]
        [MaxLength(32)]
        public string Value { get; set; }
    }
}
