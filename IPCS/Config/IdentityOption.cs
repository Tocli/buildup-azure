using System;
using System.Collections.Generic;

namespace IPCS.Config
{
    public class IdentityOption
    {
        public List<ClientOption> Clients { get; set; }

        public List<ApiResourceOption> ApiResources { get; set; }

        public IdentityOption()
        {
        }
    }
}
