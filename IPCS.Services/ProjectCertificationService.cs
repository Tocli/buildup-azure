using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;
using System.Collections.Generic;

namespace IPCS.Services
{
    public class ProjectCertificationService : GenericService<ProjectCertification>, IProjectCertificationService
    {
        private IProjectCertificationRepository projectCertificationRepository;

        public ProjectCertificationService(IProjectCertificationRepository projectCertificationRepository) : base(projectCertificationRepository)
        {
            this.projectCertificationRepository = projectCertificationRepository;
        }

        public List<ProjectCertification> ListCertificationByProjectId(int projectId)
        {
            return this.projectCertificationRepository.ListCertificationByProjectId(projectId);
        }
    }
    
}
