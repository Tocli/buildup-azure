using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "User")]
    public class ProjectSafetyController : GenericController<ProjectSafety>
    {
        private IProjectSafetyService projectSafetyService;

        public ProjectSafetyController(IProjectSafetyService projectSafetyService) : base(projectSafetyService)
        {
            this.projectSafetyService = projectSafetyService;
        }
    }
}
