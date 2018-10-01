﻿using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.OAuth.Repositories;
using IPCS.OAuth.Repositories.Context;

namespace IPCS.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserReporsitory
    {
        public UserRepository(IPCSOAuthContext context) : base(context)
        {

        }

    }
}
