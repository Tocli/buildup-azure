using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;

namespace IPCS.Services
{
    public class ProjectPropertyService : GenericService<ProjectProperty>, IProjectPropertyService
    {
        public ProjectPropertyService(IProjectPropertyRepository projectPropertyRepository) : base(projectPropertyRepository)
        {
        }
    }
}
