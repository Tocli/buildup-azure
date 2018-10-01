using System.Collections.Generic;
using IPCS.Entities;

namespace IPCS.Models
{
    public class ProjectDashboardResponseModel
    {
        public ProjectInformation projectInformation { get; set; }
        public List<ProjectCertificationResponseModel> projectCertification { get; set; }
        public List<ProjectOrderResponseModel> projectOrder { get; set; }
        public Budget budget { get; set; }
        public List<ProjectContact> projectContacts { get; set; }
        public List<ProjectActivityResponseModel> projectActivity { get; set; }
        //public List<ProjectCriticalPath> projectCriticalPath { get; set; }

        public ProjectDashboardResponseModel()
        {
        }
    }
}
