using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "User")]
    //[Authorize(Roles = "Test")]
    public class CurrencyController : GenericController<Currency>
    {
        
        private ICurrencyService currencyService;

        public CurrencyController(ICurrencyService currencyService) : base(currencyService)
        {
            this.currencyService = currencyService;
        }
        
        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return NotFound();
        }
        
        [HttpPost]
        public override IActionResult Post([FromBody]Currency currency)
        {

            return NotFound();
        }

        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<Currency> currenct)
        {
            return NotFound();
        }

        [HttpPut]
        public override IActionResult Put([FromBody]Currency currency)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<Currency> currency)
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