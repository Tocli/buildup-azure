using System;
using IPCS.Entities;
using IPCS.Repositories.Context;
using IPCS.Generic.Repositories;

namespace IPCS.Repositories
{
    public class ProjectActivityTypeRepository : GenericRepository<ActivityType>,IActivityTypeRepository
    {
        public ProjectActivityTypeRepository(IPCSContext context) : base(context)
        {

        }

    }
}
