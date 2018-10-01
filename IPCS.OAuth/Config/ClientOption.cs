﻿using System;
using System.Collections.Generic;

namespace IPCS.OAuth.Config
{
    public class ClientOption
    {
        public string ClientId { get; set; }

        public bool UpdateAccessTokenClaimsOnRefresh { get; set; }

        public int AbsoluteRefreshTokenLifetime { get; set; }

        public int SlidingRefreshTokenLifetime { get; set; }

        public bool AllowOfflineAccess { get; set; }

        public string ClientSecrets { get; set; }

        public List<string> AllowedScopes { get; set; }

        public List<string> AllowedCorsOrigins { get; set; }

        public int AccessTokenLifetime { get; set; }

        public ClientOption()
        {            
        }
    }
}
