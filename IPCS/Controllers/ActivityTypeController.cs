using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace IPCS.Controllers
{
    [Route("api/activitytype")]
    [Authorize("User")]
    public class ActivityTypeContoller : GenericController<ActivityType>
    {
        private IActivityTyperService activityTypeService;

        public ActivityTypeContoller(IActivityTyperService activityTypeService) : base(activityTypeService)
        {
            this.activityTypeService = activityTypeService;
        }

        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return NotFound();
        }
        
        [HttpPost]
        public override IActionResult Post([FromBody]ActivityType activityType)
        {
            return NotFound();
        }

        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<ActivityType> activityType)
        {
            return NotFound();
        }

        [HttpPut]
        public override IActionResult Put([FromBody]ActivityType activityType)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public IActionResult Put([FromBody]List<ProjectActivity> proejectActivity)
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