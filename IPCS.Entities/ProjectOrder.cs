using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("ProjectOrders")]
    public class ProjectOrder : BaseEntity,IValidated
    {
        [Required]
        public int ProjectId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public int CurrencyId { get; set; }

        [Required]
        public int TimeExtension { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime LastModify { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime DateSubmited { get; set; }

        [ForeignKey("ProjectId")]
        public ProjectInformation ProjectInformation { get; set; }

        [ForeignKey("CurrencyId")]
        public Currency Currency { get; set; }
    }
}
