using System;
using System.Collections.Generic;
using System.Text;

namespace IPCS.Models
{
    public class GetDailyReportByDateRequestModel
    {
        public int ProjectId { get; set; }

        public DateTime Date { get; set; }
    }
}
