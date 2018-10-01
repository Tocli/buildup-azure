using System;
using Microsoft.AspNetCore.Mvc.Filters;
using IPCS.Config;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;
using System.Collections.Generic;
using IPCS.Models;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel;
using System.Net;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace IPCS.Filters
{
    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
    public class RecaptchaAttribute : ActionFilterAttribute
    {
        public string Url { get; set; }

        public string SecretKey { get; set; }

        public RecaptchaAttribute()
        {

        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            IRecaptchaRequestModel recaptchaModel = null;
            foreach (var item in context.ActionDescriptor.Parameters)
            {
                if (item.ParameterType.GetInterfaces().Contains(typeof(IRecaptchaRequestModel)))
                {
                    recaptchaModel = (IRecaptchaRequestModel)context.ActionArguments.Where(w => w.Key == item.Name).Single().Value;
                    break;
                }
            }
            if (recaptchaModel != null)
            {
                GeneralOptions options = context.HttpContext.RequestServices.GetService<IOptions<GeneralOptions>>().Value;
                HttpClient client = new HttpClient();
                var response = client.GetStringAsync(string.Format(options.Recaptcha.Url,
                                                                   options.Recaptcha.SecretKey,
                                                                   recaptchaModel.getRecaptchaResponse())).Result;
                                                                                                        
                CaptchaResponseModel responeJson = JsonConvert.DeserializeObject<CaptchaResponseModel>(response);
                if (!responeJson.Success)
                {
                    context.Result = new BadRequestObjectResult("Invalid Captcha");
                }
            }
            else
            {
                context.Result = new BadRequestObjectResult("Invalid Captcha");
            }

            base.OnActionExecuting(context);
        }



       


    }
}
