using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("ProjectDailyReports")]
    public class ProjectDailyReport : BaseEntity,IValidated
    {

        public ProjectDailyReport()
        {
            this.ProjectActivities = new List<ProjectActivity>();            
        }

        [Required]
        public int ProjectId { get; set; }

        public DateTime Date { get; set; }

        [ForeignKey("ProjectId")]
        public ProjectInformation ProjectInformation { get; set; }

        [InverseProperty("ProjectDailyReport")]
        public List<ProjectActivity> ProjectActivities { get; set; }
    }
}
