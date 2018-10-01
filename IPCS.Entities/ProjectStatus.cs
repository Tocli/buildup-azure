using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("ProjectStatuses")]
    public class ProjectStatus : BaseEntity,IValidated
    {
        [Required]
        [MaxLength(32)]
        public string Name { get; set; }

        [Required]
        [MaxLength(32)]
        public string Description { get; set; }

        [InverseProperty("ProjectStatus")]
        public List<ProjectInformation> ProjectInformations { get; set; }
        
    }
}
