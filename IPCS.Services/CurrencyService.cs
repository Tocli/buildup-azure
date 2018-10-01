using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;

namespace IPCS.Services
{
    public class CurrencyService : GenericService<Currency>, ICurrencyService
    {
        public CurrencyService(ICurrencyRepository currencyRepository) : base(currencyRepository)
        {
        }
    }
}
