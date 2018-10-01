using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.Generic.Repositories.Paginators;
using System.Collections.Generic;


namespace IPCS.Repositories
{
    public interface IProjectInformationRepository : IGenericRepository<ProjectInformation>
    {

        Paginator<ProjectInformation> ListProjects(int page, int rowsPage, string valueFilter, string orderBy, string userId, bool isAdmin, bool desc = false, int statusId = 1);             
        List<ProjectOrder> GetProjectOrderForDashBoard(object id);
        ProjectInformation GetProjectInformationForDashBoard(int id);       
        void DeleteProject(int id);
        void UpdateRetainedAmount(object id, object retainedAmout);
        void UpdateLastModify(object id, object lastModify);
        ProjectInformation Get(int projectId, string userId, bool isAdmin);
        bool IsOwner(int projectId, string userId);

    }
}