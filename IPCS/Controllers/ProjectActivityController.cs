using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize("User")]
    public class ProjectActivityController : GenericController<ProjectActivity>
    {
        private IProjectActivityService projectActivityService;

        public ProjectActivityController(IProjectActivityService projectActivityService) : base(projectActivityService)
        {
            this.projectActivityService = projectActivityService;
        }


    }
}