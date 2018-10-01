using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using IPCS.Repositories.Context;


namespace IPCS.Repositories
{
    public class EntityRepository : GenericRepository<Entity>,IEntityRepository
    {
        public EntityRepository(IPCSContext context) : base(context)
        {

        }

    }
}
