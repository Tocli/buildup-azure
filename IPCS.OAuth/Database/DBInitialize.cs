using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using IPCS.Entities;
using Microsoft.AspNetCore.Identity;
using IPCS.OAuth.Repositories.Context;

namespace IPCS.OAuth.Database
{
    public class DBInitialize
    {
        public DBInitialize()
        {
        }

        protected static async void AddRole(IPCSOAuthContext context, string roleName)
        {
            if (context.Roles.Where(w => w.Name == roleName).Count() == 0)
            {
                await context.Roles.AddAsync(new IdentityRole { Name = roleName, NormalizedName = roleName });
                await context.SaveChangesAsync();
            }
        }

        protected static async void AddUser(IPCSOAuthContext context, string username, string password, bool isAdmin,UserManager<User> userManager)
        {
            var verifyUser = await context.Users.Where(w => w.UserName == username).FirstOrDefaultAsync();
            if (verifyUser == null)
            {
                verifyUser = new User
                {
                    UserName = username,
                    FirstName = username,
                    LastName = username,
                    Email = username,
                    CreationDate = DateTime.Now,
                    EmailConfirmed = true,
                    Valid = true,
                    PhoneNumber = "55555555555555"
                };
                var result = await userManager.CreateAsync(verifyUser, password);
            }
            var isInRole = await userManager.IsInRoleAsync(verifyUser, "ROLE_USER");
            if (!isInRole)
            {
                await userManager.AddToRoleAsync(verifyUser, "ROLE_USER");
            }
            isInRole = await userManager.IsInRoleAsync(verifyUser, "ROLE_ADMIN");
            if (!isInRole)
            {
                await userManager.AddToRoleAsync(verifyUser, "ROLE_ADMIN");
            }

            await context.SaveChangesAsync();

        }



        public static void Seed(IPCSOAuthContext context, UserManager<User> userManager)
        {
            context.Database.Migrate();
            AddRole(context, "ROLE_ADMIN");
            AddRole(context, "ROLE_USER");
#if __HPU__
            AddUser(context, "admin@hpu.buildup.buildupsystems.com", "Buildup1", true, userManager);
            AddUser(context, "rosangela.stgo@gmail.com", "Buildup1", false, userManager);
#else
            AddUser(context, "admin@admin.com", "BuildUpAdmin123!", true, userManager);
#endif

#if DEBUG
            //AddUser(context, "developerAdmin@overactiveinc.com", userManager);
            //AddUser(context, "developerUser@overactiveinc.com", "Testing123!", userManager);
#endif
        }
    }
}
