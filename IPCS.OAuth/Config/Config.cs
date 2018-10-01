using System;
using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer4.Models;

namespace IPCS.OAuth.Config
{
    public class Config
    {
		public Config()
		{
		}

		public static IEnumerable<ApiResource> GetApiResources(List<ApiResourceOption> resourcesOptions)
		{

			List<ApiResource> resources = new List<ApiResource>();
			foreach (var item in resourcesOptions)
			{
				var api = new ApiResource(item.Name, item.DisplayName);
				resources.Add(api);
			}


			return resources;

		}

		public static IEnumerable<IdentityResource> GetIdentityResources()
		{
			var resource = new IdentityResource("IPCS",
			 new List<string>() { ClaimTypes.Role, ClaimTypes.NameIdentifier, ClaimTypes.Email, ClaimTypes.Sid });
			return new List<IdentityResource>
				{
				resource
				};
		}

		public static IEnumerable<Client> GetClients(List<ClientOption> clientOptions)
		{
			var clients = new List<Client>();

			foreach (var client in clientOptions)
			{
				clients.Add(new Client
				{
					ClientId = client.ClientId,
					UpdateAccessTokenClaimsOnRefresh = client.UpdateAccessTokenClaimsOnRefresh,
					AbsoluteRefreshTokenLifetime = client.AbsoluteRefreshTokenLifetime,
					AccessTokenLifetime = client.AccessTokenLifetime,
					SlidingRefreshTokenLifetime = client.SlidingRefreshTokenLifetime,
					AccessTokenType = AccessTokenType.Jwt,
					RefreshTokenExpiration = TokenExpiration.Absolute,
					RefreshTokenUsage = TokenUsage.ReUse,
					//IdentityTokenLifetime = client.AbsoluteRefreshTokenLifetime,                    
					AllowOfflineAccess = client.AllowOfflineAccess,
					// no interactive user, use the clientid/secret for authentication
					AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
					AllowedCorsOrigins = client.AllowedCorsOrigins,
					// secret for authentication
					ClientSecrets =
					{
						new Secret(client.ClientSecrets.Sha256())
					},

					// scopes that client has access to
					AllowedScopes = client.AllowedScopes
				});
			}

			return clients;

		}

    }
}
