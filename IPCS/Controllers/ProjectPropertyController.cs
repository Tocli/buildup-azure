using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
	[Authorize("User")]
	public class ProjectPropertyController : GenericController<ProjectProperty>
    {
        private IProjectPropertyService projectPropertyService;

        public ProjectPropertyController(IProjectPropertyService projectOriderService) : base(projectOriderService)
        {
            this.projectPropertyService = projectOriderService;
        }


    }
}
