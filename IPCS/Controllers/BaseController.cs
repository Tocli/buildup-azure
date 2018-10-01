using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using IdentityServer4.Validation;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using IPCS.Models;
using System.Text;
using System.ComponentModel;
using IPCS.Entities;

namespace IPCS.Controllers
{
    public class BaseController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var isValid = true;
            var results = new List<System.ComponentModel.DataAnnotations.ValidationResult>();
            var itemName = new List<string>();

            foreach (var item in context.ActionArguments)
            {
                
                if (item.Value.GetType().GetInterfaces().Contains(typeof(IValidated)))
                {
                    var properties = item.Value.GetType().GetProperties();
                    
                    foreach (PropertyInfo prop in properties)
                    {
                        
                        var vc = new ValidationContext(item.Value,null,null);
                        var diplayName = prop.GetCustomAttributes<DisplayNameAttribute>().SingleOrDefault();
                        if(diplayName != null){
                            vc.MemberName = diplayName.DisplayName;
                        } else {
                            vc.MemberName = prop.Name;    
						}

                        IEnumerable<ValidationAttribute> valAtrs = prop.GetCustomAttributes<ValidationAttribute>();
                        object value = prop.GetGetMethod().Invoke(item.Value, null);
                        isValid = Validator.TryValidateValue(value, vc, results, valAtrs);

                        if (!isValid)
                        {
                            itemName.Add(prop.Name);
                        }
                        isValid &= isValid;
                    }
                }
            }

            if (!isValid)
            {
                StringBuilder resultError = new StringBuilder();
                var index = 0;
                foreach (var item in results)
                {
                    resultError.AppendLine(item.ErrorMessage).Append("<br />");
                    index++;
                }
                context.Result = new BadRequestObjectResult(resultError.ToString());

            }

            base.OnActionExecuting(context);
        }
    }
}
