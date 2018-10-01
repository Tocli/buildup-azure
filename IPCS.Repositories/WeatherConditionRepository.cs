using System;
using IPCS.Entities;
using IPCS.Repositories.Context;
using IPCS.Generic.Repositories;

namespace IPCS.Repositories
{
    public class WeatherConditionRepository : GenericRepository<WeatherCondition>,IWeatherConditionRepository
    {
        public WeatherConditionRepository(IPCSContext context) : base(context)
        {

        }

    }
}