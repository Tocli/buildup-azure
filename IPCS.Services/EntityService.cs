using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;

namespace IPCS.Services
{
    public class EntityService : GenericService<Entity>, IEntityService
    {
        public EntityService(IEntityRepository entityRepository) : base(entityRepository)
        {
        }
    }
}
