using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
	[Authorize("User")]
	public class WeatherConditionController : GenericController<WeatherCondition>
    {
        private IWeatherConditionService weatherConditionService;

        public WeatherConditionController(IWeatherConditionService weatherConditionService) : base(weatherConditionService)
        {
            this.weatherConditionService = weatherConditionService;
        }
        
        [HttpPost]
        public override IActionResult Post([FromBody]WeatherCondition wc)
        {

            return NotFound();
        }

        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<WeatherCondition> wc)
        {
            return NotFound();
        }

        [HttpPut]
        public override IActionResult Put([FromBody]WeatherCondition wc)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<WeatherCondition> wc)
        {
            return NotFound();
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            return NotFound();
        }

        [HttpPost("delete")]
        public override IActionResult Delete([FromBody]List<int> id)
        {
            return NotFound();
        }
    }
}
