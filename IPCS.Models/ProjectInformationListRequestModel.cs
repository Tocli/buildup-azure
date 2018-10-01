using System;
namespace IPCS.Models
{
    public class ProjectInformationListRequestModel : PaginatorRequestModel
    {

        public string ValueFilter { get; set; }

        public int Status { get; set; }

        public ProjectInformationListRequestModel()
        {
            this.OrderProperty = "ProjectName";
            this.Desc = false;
            this.Status = 1;
        }
    }
}
