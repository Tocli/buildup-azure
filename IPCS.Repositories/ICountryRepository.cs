using System;
using System.Collections.Generic;
using System.Text;
using IPCS.Generic.Repositories;
using IPCS.Entities;
using System.Threading.Tasks;

namespace IPCS.Repositories
{
    public interface ICountryRepository : IGenericRepository<Country>
    {
        Task<List<Country>> ListCountry();
    }
}
