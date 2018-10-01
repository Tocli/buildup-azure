using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IPCS.Entities
{
    [Table("ProjectContacts")]
    public class ProjectContact : BaseEntity,IValidated
    {
        [Required]
        public int ProjectId { get; set; }

        public int EntityId { get; set; }

        [MaxLength(64)]
        public string EntityDescription { get; set; }

        [MaxLength(64)]
        public string CompanyName { get; set; }

        [MaxLength(64)]
        public string ContactPerson { get; set; }

        [MaxLength(64)]
        public string ContractNum { get; set; }

        [MaxLength(64)]
        public string Tel { get; set; }

        [MaxLength(64)]
        public string Email { get; set; }

        [ForeignKey("EntityId")]
        public Entity Entity { get; set; }

        [ForeignKey("ProjectId")]
        public ProjectInformation ProjectInformation { get; set; }


    }
}
