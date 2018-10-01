using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
	[Authorize("User")]
	public class ProjectCertificationController : GenericController<ProjectCertification>
    {
        private IProjectCertificationService projectCertificationService;
        private readonly IProjectInformationService projectInformationService;


        public ProjectCertificationController(IProjectCertificationService projectCertificationService,
            IProjectInformationService projectInformationService) : base(projectCertificationService)
        {
            this.projectCertificationService = projectCertificationService;
            this.projectInformationService = projectInformationService;
        }

        [HttpPost]
        public override IActionResult Post([FromBody] ProjectCertification value)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                value.UserId = userId;
                return base.Post(value);
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(value.ProjectId, userId))
                {
                    return Forbid();
                }
                value.UserId = userId;
                return base.Post(value);
            }
         
        }

        [HttpPut]
        public override IActionResult Put([FromBody] ProjectCertification value)
        {
            if(User.IsInRole("ROLE_ADMIN"))
            {
                value.UserId = User.FindFirst(ClaimTypes.Sid).Value;
                return base.Put(value);
            }
            else
            {
                value.UserId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(value.ProjectId, value.UserId))
                {
                    return Forbid();
                }
                return base.Put(value);
            }
        }

        [HttpGet("{projectId}/certification")]
        public IActionResult ListCertification(int projectId)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                return new ObjectResult(this.projectCertificationService.ListCertificationByProjectId(projectId));
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(projectId, userId))
                {
                    return Forbid();
                }
                return new ObjectResult(this.projectCertificationService.ListCertificationByProjectId(projectId));

            }
        }

        public override IActionResult Delete(int id)
        {
            if(User.IsInRole("ROLE_ADMIN"))
            {
                return base.Delete(id);
            }
            else
            {
                var certification = this.projectCertificationService.Get(id);
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(certification.ProjectId, userId))
                {
                    return Forbid();
                }
                return base.Delete(id);
            }
        }

        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<ProjectCertification> projectCertification)
        {
            return NotFound();
        }

        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<ProjectCertification> projectCertification)
        {
            return NotFound();
        }
        
        [HttpPost("delete")]
        public override IActionResult Delete([FromBody]List<int> id)
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