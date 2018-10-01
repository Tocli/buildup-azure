using System;
using IPCS.Entities;
using IPCS.Repositories.Context;
using IPCS.Generic.Repositories;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace IPCS.Repositories
{
    public class ProjectContactRepository : GenericRepository<ProjectContact>,IProjectContactRepository
    {
        public ProjectContactRepository(IPCSContext context) : base(context)
        {

        }
        
        public List<ProjectContact> ListContactByProjectId(int projectId)
        {
            return ((IPCSContext)this.dbContext).ProjectContacts
                .Where(w => w.ProjectId == projectId)
                .Include(i => i.Entity)
                .ToList();
        }

        public override ProjectContact Update(ProjectContact entity)
        {
            entity.Entity = null;
            return base.Update(entity);
        }

    }
}
