using System;
using IPCS.Entities;
using IPCS.Generic.Services;
using System.Collections.Generic;

namespace IPCS.Services
{
    public interface IProjectOrderService : IGenericService<ProjectOrder>
    {
        List<ProjectOrder> GetProjectOrderByProjectId(object id);
    }
}
