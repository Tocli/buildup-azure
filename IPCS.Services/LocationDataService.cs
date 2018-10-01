using System;
using System.Collections.Generic;
using System.Text;
using IPCS.Generic.Services;
using IPCS.Generic.Repositories;
using IPCS.Repositories;
using IPCS.Entities;
using System.Threading.Tasks;

namespace IPCS.Services
{
    public class LocationDataService : ILocationDataService
    {
        private ICountryRepository countryRepository;
        private IStateRepository stateRepository;
        private ICityRepository cityRepository;

        public LocationDataService(ICountryRepository countryRepository, IStateRepository stateRepository,ICityRepository cityRepository)
        {
            this.countryRepository = countryRepository;
            this.stateRepository = stateRepository;
            this.cityRepository = cityRepository;
            
        }

        public async Task<List<Country>> ListCountry()
        {
            return await this.countryRepository.List();
        }

        public List<State> ListStateByCountry(string countryCode)
        {
            return this.stateRepository.ListStateByCountry(countryCode);
        }

        public List<City> ListCityByState(string stateCode)
        {
            return this.cityRepository.ListCityBySate(stateCode);
        }
    }
}
