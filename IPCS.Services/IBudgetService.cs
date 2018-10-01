using System;
using IPCS.Entities;
using IPCS.Generic.Services;
using System.Collections.Generic;

namespace IPCS.Services
{
    public interface IBudgetService : IGenericService<Budget>
    {
        List<Budget> GetBudgetList(string User);
        List<Budget> GetBudgetListForAdminUser(string UserRole);
    }
}
