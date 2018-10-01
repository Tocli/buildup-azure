using System;
using IPCS.Entities;
using IPCS.Generic.Services;
using IPCS.Repositories;

namespace IPCS.Services
{
    public class WeatherConditionService : GenericService<WeatherCondition>, IWeatherConditionService
    {
        public WeatherConditionService(IWeatherConditionRepository weatherConditionRepository ) : base(weatherConditionRepository)
        {
        }
    }
}
