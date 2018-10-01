using System;
using System.Collections.Generic;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "User")]
    public class SafetyIssueController : GenericController<SafetyIssue>
    {
        private ISafetyIssueService safetyIssueService;

        public SafetyIssueController(ISafetyIssueService safetyIssueService) : base(safetyIssueService)
        {
            this.safetyIssueService = safetyIssueService;
        }

        [HttpPost]
        public override IActionResult Post([FromBody]SafetyIssue safetyIssues)
        {
            return NotFound();
        }

        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<SafetyIssue> safetyIssues)
        {
            return NotFound();
        }

        [HttpPut]
        public override IActionResult Put([FromBody]SafetyIssue safetyIssues)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<SafetyIssue> safetyIssues)
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
