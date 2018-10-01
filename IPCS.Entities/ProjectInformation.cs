using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("ProjectInformations")]
    public class ProjectInformation : BaseEntity,IValidated
    {
        [Required]
        [MaxLength(60)]
        public string ProjectName { get; set; }

        [MaxLength(128)]
        public string ProjectNumber { get; set; }

        [Required]
        public int LocationId { get; set; }

        [MaxLength(64)]
        public string CoordinatesX { get; set; }

        [MaxLength(64)]
        public string CoordinatesY { get; set; }

        public string Scope { get; set; }

        public int ContractDuration { get; set; }

        [Required]
        public int ConstructDuration { get; set; }		

        public DateTime? Npd { get; set; }

        public DateTime? Opsd { get; set; }

        public DateTime? Apsd { get; set; }

        public DateTime? EndDate { get; set; }

        public DateTime? Scd { get; set; }

        public decimal OriginalCost { get; set; }

        public int? BudGetId { get; set; }

        [Required]
        public decimal RetainedAmount { get; set; }

        [Required]
        public int StatusId { get; set; }

        [Required]
        public DateTime LastModify { get; set; }

        [Required]
        public string LastUser { get; set; }

        public string OwnerUser { get; set; }

        [ForeignKey("LocationId")]
        public ProjectLocation ProjectLocation { get; set; }

        [ForeignKey("BudGetId")]
        public Budget Budget { get; set; }

        [ForeignKey("StatusId")]
        public ProjectStatus ProjectStatus { get; set; }

        [InverseProperty("ProjectInformation")]
        public List<ProjectDailyReport> ProjectDailyReports { get; set; }

        [NotMapped]
        public ProjectDailyReport ProjectDailyReport { get; set; }

        [InverseProperty("ProjectInformation")]
        public List<ProjectOrder> ProjectOrders { get; set; }

        [InverseProperty("ProjectInformation")]
        public List<ProjectCertification> ProjectCertifications { get; set; }

        public DateTime Created { get; set; }

        [NotMapped]
        public string Image { get; set; }

        [InverseProperty("ProjectInformation")]
        public List<ProjectContact> ProjectContacts { get; set; }

    }
}
