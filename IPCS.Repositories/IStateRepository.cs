using System;
using System.Collections.Generic;
using System.Text;
using IPCS.Generic.Repositories;
using IPCS.Entities;

namespace IPCS.Repositories
{
    public interface IStateRepository : IGenericRepository<State>
    {
        List<State> ListStateByCountry(string countryCode);
    }
}
