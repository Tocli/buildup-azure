using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
	[Authorize("User")]
	public class ProjectContactController : GenericController<ProjectContact>
    {
        private IProjectContactService projectContactService;
        private readonly IProjectInformationService projectInformationService;


        public ProjectContactController(IProjectContactService projectContactService,
            IProjectInformationService projectInformationService) : base(projectContactService)
        {
            this.projectContactService = projectContactService;
            this.projectInformationService = projectInformationService;
        }

        [HttpGet("{projectId}/contact")]
        public IActionResult ListContact(int projectId)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                return new ObjectResult(this.projectContactService.ListContactByProjectId(projectId));
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(projectId, userId))
                {
                    return Forbid();
                }
                return new ObjectResult(this.projectContactService.ListContactByProjectId(projectId));

            }
        }
        
        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<ProjectContact> proejectContact)
        {
            return NotFound();
        }
        
        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<ProjectContact> projectContact)
        {
            return NotFound();
        }
        
        public override IActionResult Delete([FromBody] List<int> id)
        {
            return NotFound();
        }

        public override IActionResult Delete(int id)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                return base.Delete(id);
            }
            else
            {
                var contact = this.projectContactService.Get(id);
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(contact.ProjectId, userId))
                {
                    return Forbid();
                }
                return base.Delete(id);

            }
        }

        [HttpPost]
        public override IActionResult Post([FromBody] ProjectContact value)
        {
            if (User.IsInRole("ROLE_ADMIN"))
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

        [HttpPut]
        public override IActionResult Put([FromBody] ProjectContact value)
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
    }
}