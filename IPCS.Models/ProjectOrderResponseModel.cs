using System;
namespace IPCS.Models
{
    public class ProjectOrderResponseModel
    {
  
        public int ProjectId { get; set; }
        
        public decimal Amount { get; set; }
        
        public int CurrencyId { get; set; }
        
        public int TimeExtension { get; set; }
        
        public int UserId { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime LastModify { get; set; }

        public ProjectOrderResponseModel()
        {
        }
    }
}
