using System;
using System.Collections.Generic;
using System.Text;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.Repositories.Context;
using System.Linq;
using System.Threading.Tasks;

namespace IPCS.Repositories
{
    public class CountryRepository : GenericRepository<Country>, ICountryRepository
    {

        public CountryRepository(IPCSContext context) : base(context)
        {
        }

        public async Task<List<Country>>ListCountry()
        {
            return await this.List();
        }

        public override Task<List<Country>> List()
        {
            return Task.FromResult(((IPCSContext)this.dbContext).Countries.OrderBy(o => o.Description).ToList());
        }

    }
}
