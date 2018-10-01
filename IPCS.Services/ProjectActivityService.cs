using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;

namespace IPCS.Services
{
    public class ProjectActivityService : GenericService<ProjectActivity>, IProjectActivityService
    {
        public ProjectActivityService(IProjectActivityRepository projectActivityRepository) : base(projectActivityRepository)
        {
        }
    }
}
