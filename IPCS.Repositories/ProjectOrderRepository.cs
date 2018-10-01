using System;
using IPCS.Entities;
using IPCS.Repositories.Context;
using IPCS.Generic.Repositories;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace IPCS.Repositories
{
    public class ProjectOrderRepository : GenericRepository<ProjectOrder>, IProjectOrderRepository
    {
        public ProjectOrderRepository(IPCSContext context) : base(context)
        {
        }

        public List<ProjectOrder> GetProjectOrdersById(object id)
        {
            var projecrOrder = ((IPCSContext)this.dbContext).ProjectOrders
                .Where(w => w.ProjectId == int.Parse(id.ToString()))
                .Include(i => i.Currency)
                .Include(i => i.ProjectInformation)
                .OrderByDescending(o => o.DateSubmited)
                .ToList();
            return projecrOrder;
        }
        
        public override ProjectOrder Update(ProjectOrder entity)
        {
            /*var query = ((IPCSContext)this.dbContext).ProjectOrders
                .Where(w => w.Id == entity.Id)
                .FirstOrDefault();
            query.Description = entity.Description;
            query.Amount = entity.Amount;
            query.CreatedAt = entity.CreatedAt;
            query.CurrencyId = entity.CurrencyId;
            query.ProjectId = entity.ProjectId;
            query.UserId = entity.UserId;
            query.TimeExtension = entity.TimeExtension;
            query.DateSubmited = entity.DateSubmited;
            */
            entity.ProjectInformation = null;
            entity.Currency = null;
            entity.LastModify = DateTime.Now;

            return base.Update(entity);
        }

        public override ProjectOrder Insert(ProjectOrder entity)
        {
            entity.ProjectInformation = null;
            entity.Currency = null;
            entity.CreatedAt = DateTime.Now;
            return base.Insert(entity);
        }
    }
}