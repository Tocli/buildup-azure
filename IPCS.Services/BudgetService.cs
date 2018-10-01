using System;
using IPCS.Entities;
using IPCS.Generic.Services;
using IPCS.Repositories;
using System.Collections.Generic;

namespace IPCS.Services
{
    public class BudgetService : GenericService<Budget>, IBudgetService
    {
        private IBudgetRepository budgetRepository;

        public BudgetService(IBudgetRepository budgetRepository):base(budgetRepository)
        {
            this.budgetRepository = budgetRepository;
        }

        public List<Budget> GetBudgetList(string User)
        {
            return this.budgetRepository.GetBudgetList(User);
        }

        public List<Budget> GetBudgetListForAdminUser(string UserRole)
        {
            return this.budgetRepository.GetBudgetListForAdminUser(UserRole);
        }
    }
}
