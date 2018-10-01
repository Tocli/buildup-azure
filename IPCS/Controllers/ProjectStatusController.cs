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
	public class ProjectStatusController : GenericController<ProjectStatus>
    {
        private IProjectStatusService projectStatusService;

        public ProjectStatusController(IProjectStatusService projectStatusService) : base(projectStatusService)
        {
            this.projectStatusService = projectStatusService;
        }

        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return NotFound();
        }

        [HttpPost]
        public override IActionResult Post([FromBody]ProjectStatus projectStatus)
        {
            return NotFound();
        }

        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<ProjectStatus> projectStatus)
        {
            return NotFound();
        }

        [HttpPut]
        public override IActionResult Put([FromBody]ProjectStatus projectStatus)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<ProjectStatus> projectStatus)
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