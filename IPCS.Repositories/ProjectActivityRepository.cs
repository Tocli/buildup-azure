using System;
using IPCS.Entities;
using IPCS.Repositories.Context;
using IPCS.Generic.Repositories;

namespace IPCS.Repositories
{
    public class ProjectActivityRepository : GenericRepository<ProjectActivity>,IProjectActivityRepository
    {
        public ProjectActivityRepository(IPCSContext context) : base(context)
        {

        }

    }
}
