using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;

namespace IPCS.Services
{
    public class ActivityTypeService : GenericService<ActivityType>, IActivityTyperService
    {
        public ActivityTypeService(IActivityTypeRepository activityTypeRepository) : base(activityTypeRepository)
        {
        }
    }
}
