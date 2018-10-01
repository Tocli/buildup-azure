using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("ProjectLocations")]
    public class ProjectLocation : BaseEntity,IValidated
    {
        [Required]
        [MaxLength(32)]
        public string Country { get; set; }

        [Required]
        [MaxLength(32)]
        public string State { get; set; }

        [Required]
        [MaxLength(32)]
        public string City { get; set; }

        [MaxLength(32)]
        public string ZipCode { get; set; }

        [Required]
        [MaxLength(64)]
        public string Address1 { get; set; }
        
        [MaxLength(64)]
        public string Address2 { get; set; }

        [InverseProperty("ProjectLocation")]
        public List<ProjectInformation> ProjectInformations { get; set; }

    }
}
