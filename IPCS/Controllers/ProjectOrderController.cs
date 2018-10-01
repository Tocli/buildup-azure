using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using IPCS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize("User")]
    public class ProjectOrderController : GenericController<ProjectOrder>
    {
        private IProjectOrderService projectOriderService;
        private readonly IProjectInformationService projectInformationService;

        public ProjectOrderController(IProjectOrderService projectOriderService,
            IProjectInformationService projectInformationService) : base(projectOriderService)
        {
            this.projectOriderService = projectOriderService;
            this.projectInformationService = projectInformationService;
        }

        [HttpPost]
        public override IActionResult Post([FromBody] ProjectOrder value)
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
        public override IActionResult Put([FromBody] ProjectOrder value)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                value.UserId = userId;
                return base.Put(value);
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(value.ProjectId, userId))
                {
                    return Forbid();
                }
                value.UserId = userId;
                return base.Put(value);
            }
        }

        [HttpGet("{projectId}/order")]
        public IActionResult ListOrders(int projectId)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                var projectOrders = this.projectOriderService.GetProjectOrderByProjectId(projectId);
                return new ObjectResult(projectOrders);
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(projectId, userId))
                {
                    return Forbid();
                }
                var projectOrders = this.projectOriderService.GetProjectOrderByProjectId(projectId);
                return new ObjectResult(projectOrders);
            }
        }
        
        public override IActionResult Delete(int id)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                return base.Delete(id);
            }
            else
            {
                var order = this.projectOriderService.Get(id);
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(order.ProjectId, userId))
                {
                    return Forbid();
                }
                return base.Delete(id);
            }
        }
        
        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return NotFound();
        }

        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<ProjectOrder> projectOrder)
        {
            return NotFound();
        }
        
        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<ProjectOrder> projectOrder)
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