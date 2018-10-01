using System;
using IPCS.Entities;
using IPCS.Generic.Services;
using System.Collections.Generic;

namespace IPCS.Services
{
    public interface IProjectCertificationService : IGenericService<ProjectCertification>
    {
        List<ProjectCertification> ListCertificationByProjectId(int projectId);
    }
}
