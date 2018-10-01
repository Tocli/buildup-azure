using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.Repositories.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using IPCS.Generic.Repositories.Paginators;

namespace IPCS.Repositories
{
    public class BudgetRepository : GenericRepository<Budget>,IBudgetRepository
    {
        public BudgetRepository(IPCSContext context):base(context)
        {
            
        }

        public override async System.Threading.Tasks.Task<System.Collections.Generic.List<Budget>> List()
        {
                return await ((IPCSContext)this.dbContext).Budgets
                .Include(i => i.Currency)
                .ToListAsync();   
        }

        public override Budget Insert(Budget entity)
        {
            var result = base.Insert(entity);
            return ((IPCSContext)this.dbContext).Budgets.Where(w => w.Id == result.Id)
                                                .Include(i=> i.Currency)
                                                .Single();
        }

        public List<Budget> GetBudgetListForAdminUser(string UserRole)
        {
            if(UserRole == "ROLE_ADMIN")
            {
                return ((IPCSContext)this.dbContext).Budgets
                        .Include(i => i.Currency)
                        .ToList();
            }
            else
            {
                var budgetEmptyList = new List<Budget>();
                return budgetEmptyList;
            }
        }
        
        public List<Budget> GetBudgetList(string User)
        {
            var user = User.ToString();
            var budgetListByBudgetOwner  =  ((IPCSContext)this.dbContext).Budgets
                .Where(w => w.BudgetOwner == User)
                .Include(i => i.Currency)
                .ToList();
            return budgetListByBudgetOwner; 
        }
    }
}
