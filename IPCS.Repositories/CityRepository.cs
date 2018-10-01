using System;
using System.Collections.Generic;
using System.Text;
using IPCS.Repositories;
using IPCS.Generic.Repositories;
using IPCS.Entities;
using IPCS.Repositories.Context;
using System.Linq;

namespace IPCS.Repositories
{
    public class CityRepository : GenericRepository<City>, ICityRepository
    {
        
        public CityRepository(IPCSContext context) : base(context) 
        {
        }

        public List<City> ListCityBySate(string stateCode)
        {
            return ((IPCSContext)this.dbContext).Cities
                .Where(w => w.StateCode == stateCode)
                .OrderBy(o => o.Description)
                .ToList();
        }

    }
}
