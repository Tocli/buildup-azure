using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPCS.Entities
{
    [Table("Budgets")]
    public class Budget : BaseEntity,IValidated
    {

        [Required]
        [MaxLength(32)]
        public string Name { get; set; }

        [Required]
        public int CurrencyId { get; set; }

        [Required]
        public decimal Ammount { get; set; }

        [Required]
        public string BudgetOwner { get; set; }

        [ForeignKey("CurrencyId")]
        public Currency Currency { get; set; } 

        [InverseProperty("Budget")]
        public List<ProjectInformation> ProjectInformations { get; set; }
        
        public Budget()
        {
        }
    }
}
