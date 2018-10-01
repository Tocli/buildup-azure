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
	public class EntityController : GenericController<Entity>
    {
        private IEntityService entityService;

        public EntityController(IEntityService entityService) : base(entityService)
        {
            this.entityService = entityService;
        }
        
        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return NotFound();
        }
        
        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<Entity> entity)
        {
            return NotFound();
        }
        
        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<Entity> entitities)
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