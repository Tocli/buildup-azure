using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("SafetyIssues")]
    public class SafetyIssue : BaseEntity
    {
        [Required]
        [MaxLength(32)]
        public string Name { get; set; }

        [Required]
        public int Order { get; set; }
      
    }
}
