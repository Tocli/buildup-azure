using System;
namespace IPCS.Models
{
    public class ProjectActivityResponseModel
    {
        //---> Project Activity Table

        public int ReportId { get; set; }

        public int? LastUser { get; set; }

        public int TypeId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? LastModify { get; set; }

        public string Description { get; set; }

        public string ExtraField { get; set; }
        
        public DateTime? ActualStartDate { get; set; }

        public DateTime? ActualEndDate { get; set; }

        public DateTime? EndTime { get; set; }

        public int? ConditionId { get; set; }

        public DateTime? StartTime { get; set; }

        //---Activity Type Table

        public string DescriptionOfActivityType { get; set; }

        public int Order { get; set; }

        public int Column { get; set; }

        public string Class { get; set; }

        public int SubType { get; set; }

        //-->Project Dayle Report
        public int ProjectId { get; set; }

        public DateTime Date { get; set; }

        //--> ProjectSafety Issues

        public string NameOfSafetyIssues { get; set; }

        public int OrderForProjecSafetyIssues { get; set; }

        public ProjectActivityResponseModel()
        {
        }
    }
}
