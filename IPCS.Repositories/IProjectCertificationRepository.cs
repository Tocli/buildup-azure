using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using System.Collections.Generic;

namespace IPCS.Repositories
{
    public interface IProjectCertificationRepository : IGenericRepository<ProjectCertification>
    {
        List<ProjectCertification> ListCertificationByProjectId(int projectId);
    }
}
