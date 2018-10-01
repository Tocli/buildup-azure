using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    [Table("States")]
    public class State : LocationData
    {
        public string CountryCode { get; set; }

        [ForeignKey("CountryCode")]
        public Country Country { get; set; }
    }
}
