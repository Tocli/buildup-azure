using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("ProjectCertifications")]
    public class ProjectCertification : BaseEntity,IValidated
    {
        [Required]
        public int ProjectId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public DateTime From { get; set; }

        [Required]
        public DateTime To { get; set; }

        [Required]
        public decimal GrossAmount { get; set; }

        [Required]
        public decimal RetainedAmount { get; set; }

        [Required]
        public int CurrencyId { get; set; }

        [Required]
        public Boolean Paid { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime LastModify { get; set; }               

        [ForeignKey("ProjectId")]
        public ProjectInformation ProjectInformation { get; set; }

        [ForeignKey("CurrencyId")]
        public Currency Currency { get; set; }

    }
}
