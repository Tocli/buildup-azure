using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;

namespace IPCS.Services
{
    public class ProjectStatusService : GenericService<ProjectStatus>, IProjectStatusService
    {
        public ProjectStatusService(IProjectStatusRepository projectStatusRepository) : base(projectStatusRepository)
        {
        }
    }
}
