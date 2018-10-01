using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("Currencies")]
    public class Currency : BaseEntity
    {
        [Required]
        [MaxLength(32)]
        public string Name { get; set; }

        [Required]
        [MaxLength(5)]
        public string Symbol { get; set; }

        [InverseProperty("Currency")]
        public List<Budget> Budgets { get; set; }
        
        [InverseProperty("Currency")]
        public List<ProjectOrder> ProjectOrders { get; set; }

        [InverseProperty("Currency")]
        public List<ProjectCertification> ProjectCertifications { get; set; }




    }
}
