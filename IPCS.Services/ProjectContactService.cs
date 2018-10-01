using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;
using System.Collections.Generic;

namespace IPCS.Services
{
    public class ProjectContactService : GenericService<ProjectContact>, IProjectContactService
    {
        private IProjectContactRepository projectContactRepository;

        public ProjectContactService(IProjectContactRepository projectContactRepository) : base(projectContactRepository)
        {
            this.projectContactRepository = projectContactRepository;
        }

        public List<ProjectContact> ListContactByProjectId(int projectId)
        {
            return this.projectContactRepository.ListContactByProjectId(projectId);
        }
    }
}
