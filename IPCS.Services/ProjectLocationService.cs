using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;

namespace IPCS.Services
{
    public class ProjectLocationService : GenericService<ProjectLocation>, IProjectLocationService
    {
        public ProjectLocationService(IProjectLocationRepository projectLocationRepository) : base(projectLocationRepository)
        {
        }
    }
}
