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
	[Authorize("User")]
	public class ProjectLocationController : GenericController<ProjectLocation>
    {
        private IProjectLocationService projectLocationService;

        public ProjectLocationController(IProjectLocationService projectLocationService) : base(projectLocationService)
        {
            this.projectLocationService = projectLocationService;
        }
        
        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<ProjectLocation> projectLocation)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<ProjectLocation> projectLocation)
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
