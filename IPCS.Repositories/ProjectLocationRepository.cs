using System;
using IPCS.Entities;
using IPCS.Repositories.Context;
using IPCS.Generic.Repositories;

namespace IPCS.Repositories
{
    public class ProjectLocationRepository : GenericRepository<ProjectLocation>,IProjectLocationRepository
    {
        public ProjectLocationRepository(IPCSContext context) : base(context)
        {

        }

    }
}
