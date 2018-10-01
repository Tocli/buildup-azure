using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using System.Collections.Generic;

namespace IPCS.Repositories
{
    public interface IProjectOrderRepository : IGenericRepository<ProjectOrder>
    {
        List<ProjectOrder> GetProjectOrdersById(object id);
    }
}
