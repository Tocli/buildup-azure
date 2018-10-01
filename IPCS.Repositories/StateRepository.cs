using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.Repositories.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IPCS.Repositories
{
    public class StateRepository : GenericRepository<State>, IStateRepository
    {

        public StateRepository(IPCSContext context) : base(context)
        {
        }

        public List<State> ListStateByCountry(string countryCode)
        {
            return ((IPCSContext)this.dbContext).States
                .Where(w => w.CountryCode == countryCode)
                .OrderBy(o => o.Description).ToList();
        }
    }
}
