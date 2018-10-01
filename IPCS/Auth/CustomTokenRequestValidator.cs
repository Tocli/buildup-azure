using System;
using System.Threading.Tasks;
using IdentityServer4.Validation;

namespace IPCS.Auth
{
    public class CustomTokenRequestValidator : ICustomTokenRequestValidator
    {
        public CustomTokenRequestValidator()
        {
        }

        public Task ValidateAsync(CustomTokenRequestValidationContext context)
        {
			return Task.FromResult(0);
        }
    }
}
