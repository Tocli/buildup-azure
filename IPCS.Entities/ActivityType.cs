using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("ActivityTypes")]
    public class ActivityType : BaseEntity, IValidated
    {
        [Required]
        [MaxLength(64)]
        public string Name { get; set; }

        [Required]
        [MaxLength(128)]
        public string Description { get; set; }

        [Required]
        public int Order { get; set; }

        [Required]
        public int Column { get; set; }

        public string Class { get; set; }

        public int SubType { get; set; }

        [InverseProperty("ActivityType")]
        public List<ProjectActivity> ProjectActivities { get; set; }

    }
}
