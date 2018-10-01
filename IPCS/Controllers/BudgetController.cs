using System;
using IPCS.Entities;
using IPCS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IPCS.Controllers
{
    [Route("api/[controller]")]
    [Authorize("User")]
    public class BudgetController : GenericController<Budget>
    {
        private IBudgetService budgetService;

        public BudgetController(IBudgetService budgetService) : base(budgetService)
        {
            this.budgetService = budgetService;
        }

        [HttpPut]
        public override IActionResult Put(Budget value)
        {
            value.BudgetOwner = User.FindFirst(ClaimTypes.Sid).Value;
            var result = this.budgetService.Insert(value);
            return Ok(value); 
        }

        [HttpGet]
        public override Task<IActionResult> Get()
        {
            var user = User.FindFirst(ClaimTypes.Sid).Value;
            if (User.IsInRole("ROLE_ADMIN"))
            {
                return Task.FromResult<IActionResult>(Ok(this.budgetService.GetBudgetListForAdminUser(User.FindFirst(ClaimTypes.Role).Value)));
            }
            else
            {
                return Task.FromResult<IActionResult>(Ok(this.budgetService.GetBudgetList(user)));
            }
        }

        [HttpGet("{id}")]
        public override IActionResult Get(int id)
        {
            return NotFound();
        }

        [HttpPost]
        public override IActionResult Post([FromBody]Budget budget)
        {
            return NotFound();
        }

        [HttpPost("list")]
        public override IActionResult Post([FromBody]List<Budget> budget)
        {
            return NotFound();
        }
       
        [HttpPut("list")]
        public override IActionResult Put([FromBody]List<Budget> budget)
        {
            return NotFound();
        }

        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
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
