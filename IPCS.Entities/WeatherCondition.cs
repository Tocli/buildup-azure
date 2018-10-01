using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("WeatherConditions")]
    public class WeatherCondition : BaseEntity
    {
        [Required]
        [MaxLength(64)]
        public string Name { get; set; }

        [Required]
        public int Order { get; set; }
       
    }
}
