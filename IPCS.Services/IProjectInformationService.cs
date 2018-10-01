using System;
using IPCS.Entities;
using IPCS.Generic.Services;
using IPCS.Models;
using System.Collections.Generic;

namespace IPCS.Services
{
    public interface IProjectInformationService : IGenericService<ProjectInformation>
    {
        PaginatorResponseModel<ProjectInformation> ListProjects(ProjectInformationListRequestModel requestModel,string userId, bool isAdmin);
        ProjectInformation GetDashBoardInformation(int projectId);
        void DeleteProject(int id);
        void UpdateRetainedAmount(object id, object retainedAmount);
        void UpdateLastModify(object id, object lastModify);
        ProjectInformation Get(int projectId, string userId, bool isAdmin);
        bool IsOwner(int projectId, string userId);


    }

}
