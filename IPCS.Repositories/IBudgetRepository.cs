using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using System.Collections.Generic;

namespace IPCS.Repositories
{
    public interface IBudgetRepository : IGenericRepository<Budget>
    {
        List<Budget> GetBudgetList(string User);
        List<Budget> GetBudgetListForAdminUser(string UserRole);
    }
}
