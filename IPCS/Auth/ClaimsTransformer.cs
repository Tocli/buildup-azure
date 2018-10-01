using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

namespace IPCS.Auth
{
    public class ClaimsTransformer : IClaimsTransformer
    {
        private UserManager<IPCS.Entities.User> _userManager;

        public ClaimsTransformer(UserManager<IPCS.Entities.User> userManager)
        {
            _userManager = userManager;
        }

		public async Task<ClaimsPrincipal> TransformAsync(ClaimsTransformationContext context)
		{
			if (context.Principal.Identity.IsAuthenticated)
			{
				Claim userId = context.Principal.FindFirst("sub");

				if (context.Principal.FindFirst("role") == null && userId != null)
				{
                    IPCS.Entities.User user = await _userManager.FindByIdAsync(userId.Value);
					var roles = await _userManager.GetRolesAsync(user);
					foreach (var role in roles)
					{
                        ((ClaimsIdentity)context.Principal.Identity).AddClaim(new Claim(ClaimTypes.Role,role));
					}
				}
			}
			return Task.FromResult(context.Principal).Result;
		}
    }
}
