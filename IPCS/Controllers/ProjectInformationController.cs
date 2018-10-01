using System;
using System.IO;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.Internal;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Linq;
using IPCS.Models;
using System.Reflection;
using IPCS.Generic.Repositories;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize("User")]
    public class ProjectInformationController : GenericController<ProjectInformation>
    {
        private IProjectInformationService projectInformationService;

        private readonly IHostingEnvironment appEnvironment;

        public ProjectInformationController(IProjectInformationService projectInformationService,
                                           IHostingEnvironment appEnvironment) : base(projectInformationService)
        {
            this.projectInformationService = projectInformationService;
            this.appEnvironment = appEnvironment;
        }




        public override IActionResult Get(int id)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                return new ObjectResult(this.projectInformationService.Get(id, User.FindFirst(ClaimTypes.Sid).Value, User.IsInRole("ROLE_ADMIN")));
            }
            else
            {
                return new ObjectResult(this.projectInformationService.Get(id, User.FindFirst(ClaimTypes.Sid).Value, User.IsInRole("ROLE_ADMIN")));
            }
        }

        [HttpPost("projectlist")]
        public IActionResult ProjectList([FromBody]Models.ProjectInformationListRequestModel paginatorRequestModel)
        {
            bool isAdmin = User.IsInRole("ROLE_ADMIN");
            return Ok(this.projectInformationService.ListProjects(paginatorRequestModel, User.FindFirst(ClaimTypes.Sid).Value, isAdmin));
        }

        [HttpGet("{id}/dashboard")]
        public IActionResult ProjectDashBoard(int id)
        {
            var userId = User.FindFirst(ClaimTypes.Sid).Value;
            if (User.IsInRole("ROLE_ADMIN"))
            {
                var result = this.projectInformationService.GetDashBoardInformation(id);
                return Ok(result);
            }
            else
            {
                if (!this.projectInformationService.IsOwner(id, userId))
                {
                    return Forbid();
                }
                var result = this.projectInformationService.GetDashBoardInformation(id);
                return Ok(result);
            }
        }

        [HttpPut]
        public override IActionResult Put(ProjectInformation value)
        {
            value.OwnerUser = User.FindFirst(ClaimTypes.Sid).Value;
            value.LastUser = User.FindFirst(ClaimTypes.Sid).Value;
            var result = this.projectInformationService.Insert(value);
            SaveBase64ToImage(value.Image, result.Id.ToString());
            return Ok(value);
        }

        [HttpPost]
        public override IActionResult Post(ProjectInformation value)
        {
            if(User.IsInRole("ROLE_ADMIN"))
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                value.LastUser = User.FindFirst(ClaimTypes.Sid).Value;
                this.SaveBase64ToImage(value.Image, value.Id.ToString());
                return base.Post(value);
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (value.OwnerUser != userId)
                {
                    return Forbid();
                }
                value.LastUser = User.FindFirst(ClaimTypes.Sid).Value;
                this.SaveBase64ToImage(value.Image, value.Id.ToString());
                return base.Post(value);
            }
        }

        public void SaveBase64ToImage(string base64String, string projectId)
        {
            // Convert base 64 string to byte[]
            if (string.IsNullOrEmpty(base64String))
                return;

            byte[] imageBytes = Convert.FromBase64String(base64String);
            // Convert byte[] to Image
            using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                Image image = Image.FromStream(ms, true);
                var projectImagePath = Path.Combine(this.appEnvironment.WebRootPath, "upload", "project");
                if (!Directory.Exists(projectImagePath))
                {
                    Directory.CreateDirectory(projectImagePath);
                }
                var path = Path.Combine(projectImagePath, projectId.ToString() + ".png");
                image.Save(path);
            }
        }

        [HttpPost("uploadImage/{projectId}")]
        public async System.Threading.Tasks.Task<IActionResult> UploadImageAsync(int projectId)
        {

            var projectImagePath = Path.Combine(this.appEnvironment.WebRootPath, "upload", "project");
            if (!Directory.Exists(projectImagePath))
            {
                Directory.CreateDirectory(projectImagePath);
            }

            foreach (var file in Request.Form.Files)
            {
                var ext = new FileInfo(file.FileName).Extension;
                var fullPath = Path.Combine(projectImagePath, projectId.ToString() + ".png");
                using (var fileStream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                this.CreateThumbnail(projectImagePath, projectId.ToString() + ".png");
            }


            return Ok();
        }

        private void CreateThumbnail(string basePath, string name)
        {
            const int size = 76;
            const int quality = 100;

            using (var image = new Bitmap(System.Drawing.Image.FromFile(Path.Combine(basePath, name))))
            {
                int width, height;
                if (image.Width > image.Height)
                {
                    width = size;
                    height = Convert.ToInt32(image.Height * size / (double)image.Width);
                }
                else
                {
                    width = Convert.ToInt32(image.Width * size / (double)image.Height);
                    height = size;
                }
                var resized = new Bitmap(width, height);
                using (var graphics = Graphics.FromImage(resized))
                {
                    graphics.CompositingQuality = CompositingQuality.HighSpeed;
                    graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    graphics.CompositingMode = CompositingMode.SourceCopy;
                    graphics.DrawImage(image, 0, 0, width, height);
                    var path = Path.Combine(basePath, "thum_" + name);
                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }
                    using (var output = System.IO.File.Create(path))
                    {
                        var qualityParamId = Encoder.Quality;
                        var encoderParameters = new EncoderParameters(1);
                        encoderParameters.Param[0] = new EncoderParameter(qualityParamId, quality);
                        var codec = ImageCodecInfo.GetImageDecoders().Where(w => w.FormatID == ImageFormat.Png.Guid).Single();
                        resized.Save(output, codec, encoderParameters);
                    }
                }
            }
        }

        [HttpPost("deleteProject/{id}")]
        public IActionResult DeleteProject(int id)
        {
            
            var userId = User.FindFirst(ClaimTypes.Sid).Value;
            if(User.IsInRole("ROLE_ADMIN"))
            {
                this.projectInformationService.DeleteProject(id);
                return Ok();
            }
            else
            {
                if (!this.projectInformationService.IsOwner(id, userId))
                {
                    return Forbid();
                }
                this.projectInformationService.DeleteProject(id);
                return Ok();
            }
        }

        [HttpPost("updateRetainedAmount")]
        public IActionResult updateRetainedAmount([FromBody] RetainedAmountUpdateRequest request)
        {
            if (User.IsInRole("ROLE_ADMIN"))
            {
                this.projectInformationService.UpdateRetainedAmount(request.ProjectId, request.RetainedAmount);
                return Ok();
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(request.ProjectId, userId))
                {
                    return Forbid();
                }
                this.projectInformationService.UpdateRetainedAmount(request.ProjectId, request.RetainedAmount);
                return Ok();
            }
        }

        [HttpPost("updateLastModify")]
        public IActionResult updateLastModify([FromBody] LastModifyUpdateRequest request)
        {
            if(User.IsInRole("ROLE_ADMIN"))
            {
                this.projectInformationService.UpdateLastModify(request.ProjectId, request.LastModify);
                return Ok();
            }
            else
            {
                var userId = User.FindFirst(ClaimTypes.Sid).Value;
                if (!this.projectInformationService.IsOwner(request.ProjectId, userId))
                {
                    return Forbid();
                }
                this.projectInformationService.UpdateLastModify(request.ProjectId, request.LastModify);
                return Ok();
            }
            
        }

        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<ProjectInformation> projectInformation)
        {
            return NotFound();
        }

        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<ProjectInformation> projectInformation)
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

        public override IActionResult Delete(int id)
        {
            return NotFound();
        }
    }
}