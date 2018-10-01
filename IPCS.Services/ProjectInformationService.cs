using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;
using IPCS.Models;
using System.Collections.Generic;
using System.Linq;

namespace IPCS.Services
{
    public class ProjectInformationService : GenericService<ProjectInformation>, IProjectInformationService
    {
        private readonly IProjectInformationRepository projectInformationRepository;

        public ProjectInformationService(IProjectInformationRepository projectInformationRepository) : base(projectInformationRepository)
        {
            this.projectInformationRepository = projectInformationRepository;
        }

        public PaginatorResponseModel<ProjectInformation> ListProjects(ProjectInformationListRequestModel requestModel,string userId, bool isAdmin)
        {
            var paginator = this.projectInformationRepository.ListProjects(requestModel.Page, requestModel.RowsPage, requestModel.ValueFilter, requestModel.OrderProperty, userId, isAdmin, requestModel.Desc, requestModel.Status);
            return new PaginatorResponseModel<ProjectInformation>
            {
                ResultList = paginator.Result,
                TotalRows = paginator.TotalRow
            };
        }

        public ProjectInformation Get(int projectId, string userId, bool isAdmin)
        {
            return this.projectInformationRepository.Get(projectId, userId, isAdmin);
        }

        public ProjectInformation GetDashBoardInformation(int projectId)
        {
            return this.projectInformationRepository.GetProjectInformationForDashBoard(projectId); ;
        }

        public void DeleteProject(int id)
        {
            this.projectInformationRepository.DeleteProject(id);
        }

        public void UpdateRetainedAmount(object id, object retainedAmount)
        {
            this.projectInformationRepository.UpdateRetainedAmount(id, retainedAmount);
        }

        public void UpdateLastModify(object id, object lastModify)
        {
            this.projectInformationRepository.UpdateLastModify(id, lastModify);
        }

        public bool IsOwner(int projectId, string userId)
        {
            return this.projectInformationRepository.IsOwner(projectId, userId);
        }
    }
}

