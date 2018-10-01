using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("ProjectActivities")]
    public class ProjectActivity : BaseEntity, IValidated
    {
        [Required]
        public int ReportId { get; set; }

        //[Required]
        public int? LastUser { get; set; }

        [Required]
        public int TypeId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
                
        public Nullable<DateTime> LastModify { get; set; }

        [Required]
        [MaxLength(4000)]
        public string Description { get; set; }

        [MaxLength(4000)]
        public string ExtraField { get; set; }

        [ForeignKey("ReportId")]
        public ProjectDailyReport ProjectDailyReport { get; set; }

        [ForeignKey("TypeId")]
        public ActivityType ActivityType { get; set; }
        
        public Nullable<DateTime> ActualStartDate { get; set; }

        public Nullable<DateTime> ActualEndDate { get; set; }

        public Nullable<DateTime> EndTime { get; set; }

        public int? ConditionId { get; set; }

        public Nullable<DateTime> StartTime { get; set; }

        [ForeignKey("ConditionId")]
        public WeatherCondition WeatherCondition { get; set; }

        public int? SafetyId { get; set; }

        [ForeignKey("SafetyId")]
        public SafetyIssue SafetyIssue { get; set; }

        [NotMapped]
        public bool IsDraft { get; set; }

        [NotMapped]
        public DateTime DraftDate { get; set; }

        [NotMapped]
        public DateTime DailyReportDate { get; set; }
    }
}
