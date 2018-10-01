using System;
using System.Collections.Generic;
using System.Text;
using IPCS.Generic.Services;
using IPCS.Entities;
using System.Threading.Tasks;

namespace IPCS.Services
{
    public interface ILocationDataService
    {
        Task<List<Country>> ListCountry();
        List<State> ListStateByCountry(string countryCode);
        List<City> ListCityByState(string stateCode);
    }
}
