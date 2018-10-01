using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("Entities")]
    public class Entity : BaseEntity
    {
        [Required]
        [MaxLength(64)]
        public string Name { get; set; }

        [InverseProperty("Entity")]
        public List<ProjectContact> ProjectContacts { get; set; }


    }
}
