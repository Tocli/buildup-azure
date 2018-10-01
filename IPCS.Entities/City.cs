using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{   
    [Table("Cities")]
    public class City : LocationData
    {
        public string StateCode { get; set; }

        [ForeignKey("StateCode")]
        public State State { get; set; }
    }
}
