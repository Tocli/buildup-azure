using System;
using IPCS.Entities;
using IPCS.Generic.Services;

namespace IPCS.OAuth.Services
{
    public interface IRecoverPasswordService : IGenericService<RecoverPassword>
    {
        User ValidateHashAndGetUser(string hash);

        User ValidateHashAndGetUserAndDisable(string hash);

    }
}