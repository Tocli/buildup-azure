using System;
using IPCS.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IPCS.OAuth.Repositories.Context
{
    public class IPCSOAuthContext : IdentityDbContext<User>
    {        

        public DbSet<RecoverPassword> RecoveryPasswords { get; set; }

        public IPCSOAuthContext(DbContextOptions<IPCSOAuthContext> options) : base(options)
        {
            
        }
    }
}
