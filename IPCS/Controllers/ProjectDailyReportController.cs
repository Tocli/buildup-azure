using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using IPCS.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
	[Authorize("User")]
	public class ProjectDailyReportController : GenericController<ProjectDailyReport>
    {
        private IProjectDailyReportService projectDailyReportService;
        private readonly IProjectInformationService projectInformationService;

        public ProjectDailyReportController(IProjectDailyReportService projectDailyReportService,
                    IProjectInformationService projectInformationService) : base(projectDailyReportService)
        {
            this.projectDailyReportService = projectDailyReportService;
            this.projectInformationService = projectInformationService;
        }

        [HttpGet("getSafetySemaphoreStatus/{projectId}")]
        public IActionResult GetSafetySemaphoreStatus(int projectId)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                return new ObjectResult(this.projectDailyReportService.GetSafetyActivities(projectId, User.Identity.Name));
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(projectId, userId))
                {
                    return Forbid();
                }
                return new ObjectResult(this.projectDailyReportService.GetSafetyActivities(projectId, User.Identity.Name));
            }
        }

        [HttpPost("getbydate")]
        public IActionResult GetProjectDailyReportByDate([FromBody]GetDailyReportByDateRequestModel request)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                return new ObjectResult(this.projectDailyReportService.GetProjectDailyReportByDate(request, User.Identity.Name));
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(request.ProjectId, userId))
                {
                    return Forbid();
                }
                return new ObjectResult(this.projectDailyReportService.GetProjectDailyReportByDate(request, User.Identity.Name));

            }
        }

        public override IActionResult Post([FromBody] ProjectDailyReport value)
        {
            if(User.IsInRole("ROLE_ADMIN"))
            {
                return base.Post(value);
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(value.ProjectId, userId))
                {
                    return Forbid();
                }
                return base.Post(value);
            }
        }

        public override IActionResult Put([FromBody] ProjectDailyReport value)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                return base.Put(value);
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(value.ProjectId, userId))
                {
                    return Forbid();
                }
                return base.Put(value);
            }
        }

        public override IActionResult Delete(int id)
        {
            return NotFound();
        }

        public override Task<IActionResult> Get()
        {
            return Task.FromResult<IActionResult>(NotFound());
        }

        public override IActionResult Get(int id)
        {
            return NotFound();
        }
    }
}