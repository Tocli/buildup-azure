using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
using IPCS.Models;
using IPCS.Generic.Services;

namespace IPCS.Controllers
{
    [Produces("application/json")]
    public abstract class GenericController<T> : BaseController where T :class
    {
        private IGenericService<T> genericService;

        public GenericController(IGenericService<T> genericService){
            this.genericService = genericService;
        }

		[HttpGet]
        public virtual async Task<IActionResult> Get()
		{
            var result = await genericService.List();
            return new ObjectResult(result);
		}

        [HttpPost("paginated")]
        public virtual IActionResult GetPaginated([FromBody] PaginatorRequestModel paginatorRequestModel)
		{
            var result = genericService.List(paginatorRequestModel);
			return new ObjectResult(result);
		}

        [HttpGet("{id}")]
        public virtual IActionResult Get(int id)
        {
            return new ObjectResult(genericService.Get(id));
        }

        // POST api/values
        [HttpPost]
        public virtual IActionResult Post([FromBody]T value)
        {
            
            return new ObjectResult(genericService.Update(value));
        }

        [HttpPost("list")]
		public virtual IActionResult Post([FromBody]List<T> value)
		{
            genericService.UpdateAll(value);
            return Ok();
		}

        [HttpPut]
        public virtual IActionResult Put([FromBody]T value)
        {
            return new ObjectResult(genericService.Insert(value));
		}

		[HttpPut("list")]
        public virtual IActionResult Put([FromBody]List<T> value)
		{
            genericService.InsertAll(value);
            return Ok();
		}

        [HttpDelete("{id}")]
        public virtual IActionResult Delete(int id)
        {
            genericService.Delete(id);
            return Ok();
        }

        [HttpPost("delete")]
        public virtual IActionResult Delete([FromBody]List<int> id)
		{
            genericService.DeleteAll(id.Cast<object>().ToArray());
            return Ok();
		}

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if(disposing){
                genericService.Dispose();
            }
        }
    }
}
