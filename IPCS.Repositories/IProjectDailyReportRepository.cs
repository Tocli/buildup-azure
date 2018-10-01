using System;
using IPCS.Entities;
using IPCS.Generic.Repositories;
using System.Collections.Generic;

namespace IPCS.Repositories
{
    public interface IProjectDailyReportRepository : IGenericRepository<ProjectDailyReport>
    {
        ProjectDailyReport GetProjectDailyReportByDate(int projectId, DateTime date, string userId);
        List<ProjectActivity> GetSafetyActivities(int projectId, string userId);
    }
}
