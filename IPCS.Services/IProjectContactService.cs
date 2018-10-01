using System;
using IPCS.Entities;
using IPCS.Generic.Services;
using System.Collections.Generic;

namespace IPCS.Services
{
    public interface IProjectContactService : IGenericService<ProjectContact>
    {
        List<ProjectContact> ListContactByProjectId(int projecId);
    }

}
