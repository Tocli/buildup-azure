using System;
using IPCS.Entities;
using System.Linq;
using IPCS.OAuth.Repositories.Context;
using IPCS.OAuth.Repositories;
using IPCS.Generic.Repositories;

namespace IPCS.Repositories
{
    public class RecoverPasswordRepository : GenericRepository<RecoverPassword>, IRecoverPasswordRepository
    {
        public RecoverPasswordRepository(IPCSOAuthContext context) : base(context)
        {

        }

        public RecoverPassword GetRecoverPasswordByHash(string hash) {

            return ((IPCSOAuthContext)this.dbContext).RecoveryPasswords.Where(w => w.Hash == hash).SingleOrDefault(); 

        }

        public RecoverPassword RecoverUserIdByHash(string userId) {

            return ((IPCSOAuthContext)this.dbContext).RecoveryPasswords.Where(w => w.UserId == userId).FirstOrDefault();
        }

    }
}