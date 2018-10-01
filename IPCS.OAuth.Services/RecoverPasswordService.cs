using System;
using IPCS.Entities;
using IPCS.Generic.Services;
using IPCS.OAuth.Repositories;

namespace IPCS.OAuth.Services
{
    public class RecoverPasswordService : GenericService<RecoverPassword>, IRecoverPasswordService
    {
        private IUserReporsitory userRepository;

        public RecoverPasswordService(IRecoverPasswordRepository recoverPasswordRepository, IUserReporsitory userRepository) : base(recoverPasswordRepository)
        {
            this.userRepository = userRepository;
        }

        public User ValidateHashAndGetUser(string hash)
        {
            var recoverPassword = ((IRecoverPasswordRepository)this.genericRepository).GetRecoverPasswordByHash(hash);
            if (!ValidateRecoverPassword(recoverPassword))
            {
                return null;
            }
            return this.userRepository.Get(recoverPassword.UserId);

        } 

        private bool ValidateRecoverPassword(RecoverPassword recoverPassword)
        {
            if (recoverPassword == null)
            {
                return false;
            }
            if (recoverPassword.RecoverDate < DateTime.Now)
            {
                return false;
            }
            if (recoverPassword.Used == true)
            {
                return false;

            }

            return true;
        }

        public User ValidateHashAndGetUserAndDisable(string hash)
        {
            User user = ValidateHashAndGetUser(hash);
            if(user == null)
            {
                return null;
            }
            var recoverPassword = ((IRecoverPasswordRepository)this.genericRepository).GetRecoverPasswordByHash(hash);
            recoverPassword.Used = true;
            this.genericRepository.Update(recoverPassword);
            return user;
        }


    }
}
