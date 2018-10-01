using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.Repositories.Context;

namespace IPCS.Repositories
{
    public class CurrencyRepository : GenericRepository<Currency>,ICurrencyRepository
    {
        public CurrencyRepository(IPCSContext context) : base(context)
        {

        }

    }
}
