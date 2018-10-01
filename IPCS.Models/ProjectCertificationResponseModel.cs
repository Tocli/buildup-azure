using System;
namespace IPCS.Models
{
    public class ProjectCertificationResponseModel
    {
      
        public int ProjectId { get; set; }

        public DateTime Date { get; set; }

        public DateTime From { get; set; }

        public DateTime To { get; set; }
        
        public int GrossAmount { get; set; }

        public int CurrencyId { get; set; }

        public Boolean Paid { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastModify { get; set; }

        public ProjectCertificationResponseModel()
        {
        }
    }
}
