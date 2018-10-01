using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;

namespace IPCS.OAuth.Repositories
{
    public interface IRecoverPasswordRepository : IGenericRepository<RecoverPassword>
    {
        RecoverPassword GetRecoverPasswordByHash(string hash);
        RecoverPassword RecoverUserIdByHash(string hash);



    }


}