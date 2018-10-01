using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
	[Authorize("User")]
	public class ProjectWeatherController : GenericController<ProjectWeather>
    {
        private IProjectWeatherService projectWeatherController;

        public ProjectWeatherController(IProjectWeatherService projectWeatherController) : base(projectWeatherController)
        {
            this.projectWeatherController = projectWeatherController;
        }


    }
}
