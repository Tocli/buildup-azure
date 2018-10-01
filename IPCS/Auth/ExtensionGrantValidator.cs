using System;
using System.Threading.Tasks;
using IdentityServer4.Validation;

namespace IPCS.Auth
{
    public class ExtensionGrantValidator : IExtensionGrantValidator
    {
        public ExtensionGrantValidator()
        {
        }

        public string GrantType => "delegation";

        public Task ValidateAsync(ExtensionGrantValidationContext context)
        {

            return Task.FromResult(0);
        }
    }
}
