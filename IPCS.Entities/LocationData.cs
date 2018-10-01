using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace IPCS.Entities
{
    public abstract class LocationData
    {
        [Key]
        public string Code { get; set; }

        public Boolean ListAvailable { get; set; }

        public string Description { get; set; }

        public LocationData() {
        }
    }
}
