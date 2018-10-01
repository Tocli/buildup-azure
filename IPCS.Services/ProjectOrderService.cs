using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;
using System.Collections.Generic;

namespace IPCS.Services
{
    public class ProjectOrderService : GenericService<ProjectOrder>, IProjectOrderService
    {
        private readonly IProjectOrderRepository projectOrderRepository;

        public ProjectOrderService(IProjectOrderRepository projectOrderRepository) : base(projectOrderRepository)
        {
            this.projectOrderRepository = projectOrderRepository;
        }

        public List<ProjectOrder> GetProjectOrderByProjectId(object id)
        {
            return this.projectOrderRepository.GetProjectOrdersById(id);
        }
    }
}
