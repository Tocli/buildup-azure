using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.Repositories.Context;

namespace IPCS.Repositories
{
    public class ProjectPropertyRepository : GenericRepository<ProjectProperty>,IProjectPropertyRepository
    {
        public ProjectPropertyRepository(IPCSContext context) : base(context)
        {

        }

    }
}