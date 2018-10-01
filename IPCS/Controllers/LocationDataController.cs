using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IPCS.Entities;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize("User")]
    public class LocationDataController : BaseController
    {
        private readonly ILocationDataService locationDataService; 

        public LocationDataController(ILocationDataService locationDataService)
        {
            this.locationDataService = locationDataService;
        }

        [HttpGet("countries")]
        public async Task<IActionResult> ListCountry()
        {
            var list = await this.locationDataService.ListCountry();
            return new ObjectResult(list);
        }

        [HttpGet("{countryCode}/states")]
        public IActionResult ListCountry(string countryCode)
        {
            return new ObjectResult(this.locationDataService.ListStateByCountry(countryCode));
        }

        [HttpGet("{stateCode}/cities")]
        public IActionResult ListCities(string stateCode)
        {
            return new ObjectResult(this.locationDataService.ListCityByState(stateCode));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return NotFound();
        }
        
        [HttpPost]
        public IActionResult Post([FromBody]Country country)
        {
            return NotFound();
        }
        
        [HttpPost]
        public IActionResult Post([FromBody]State state)
        {
            return NotFound();
        }

        [HttpPost]
        public IActionResult Post([FromBody]City city)
        {
            return NotFound();
        }
        
        [HttpPost("list")]
        public IActionResult Post([FromBody]List<Country> country)
        {
            return NotFound();
        }

        [HttpPost("list")]
        public IActionResult Post([FromBody]List<State> state)
        {
            return NotFound();
        }

        [HttpPost("list")]
        public IActionResult Post([FromBody]List<City> city)
        {
            return NotFound();
        }

        [HttpPut]
        public IActionResult Put([FromBody]Country coutry)
        {
            return NotFound();
        }

        [HttpPut]
        public IActionResult Put([FromBody]State state)
        {
            return NotFound();
        }

        [HttpPut]
        public IActionResult Put([FromBody]City city)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public IActionResult Put([FromBody]List<Country> country)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public IActionResult Put([FromBody]List<State> state)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public IActionResult Put([FromBody]List<City> city)
        {
            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return NotFound();
        }

        [HttpPost("delete")]
        public IActionResult Delete([FromBody]List<int> id)
        {
            return NotFound();
        }
    }
}
