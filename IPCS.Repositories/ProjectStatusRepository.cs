using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.Repositories.Context;

namespace IPCS.Repositories
{
    public class ProjectStatusRepository : GenericRepository<ProjectStatus>,IProjectStatusRepository
    {
        public ProjectStatusRepository(IPCSContext context) : base(context)
        {

        }

    }
}