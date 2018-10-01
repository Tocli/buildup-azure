using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using System.Collections.Generic;

namespace IPCS.Repositories
{
        public interface IProjectContactRepository : IGenericRepository<ProjectContact>
        {
            List<ProjectContact> ListContactByProjectId(int projectId);
        }
    
}
