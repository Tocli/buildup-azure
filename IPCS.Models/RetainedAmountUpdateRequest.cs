using System;
using System.Collections.Generic;
using System.Text;

namespace IPCS.Models
{
    public class RetainedAmountUpdateRequest
    {
        public int ProjectId { get; set; }

        public decimal RetainedAmount { get; set; }
    }
}
