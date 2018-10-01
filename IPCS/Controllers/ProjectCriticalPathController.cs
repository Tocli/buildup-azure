using Microsoft.AspNetCore.Mvc;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "User")]
    public class ProjectCriticalPathController : GenericController<ProjectCriticalPath>
    {
        private IProjectCriticalPathService projectCriticalPathService;

        public ProjectCriticalPathController(IProjectCriticalPathService projectCriticalPathService) : 
            base(projectCriticalPathService)
        {
            this.projectCriticalPathService = projectCriticalPathService;
        }
    }
}
