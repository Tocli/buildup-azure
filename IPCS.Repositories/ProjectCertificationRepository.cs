using System;
using IPCS.Entities;
using IPCS.Repositories.Context;
using IPCS.Generic.Repositories;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace IPCS.Repositories
{
    public class ProjectCertificationRepository : GenericRepository<ProjectCertification>,IProjectCertificationRepository
    {
        public ProjectCertificationRepository(IPCSContext context) : base(context)
        {

        }

        public List<ProjectCertification> ListCertificationByProjectId(int projectId)
        {
            return ((IPCSContext)this.dbContext).ProjectCertifications
                .Where(w => w.ProjectId == projectId)
                .Include(i => i.Currency)
                .OrderByDescending(o => o.Date)
                .ToList();
        }

        public override ProjectCertification Update(ProjectCertification entity)
        {
            entity.LastModify = DateTime.Now;
            entity.Currency = null;
            return base.Update(entity);
        }

        public override ProjectCertification Insert(ProjectCertification entity)
        {
            entity.CreatedAt = DateTime.Now;
            return base.Insert(entity);
        }
    }
}
