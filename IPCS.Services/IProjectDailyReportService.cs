using System;
using IPCS.Entities;
using IPCS.Generic.Services;
using IPCS.Models;
using System.Collections.Generic;

namespace IPCS.Services
{
    public interface IProjectDailyReportService : IGenericService<ProjectDailyReport>
    {
        ProjectDailyReport GetProjectDailyReportByDate(GetDailyReportByDateRequestModel request, string userId);
        List<ProjectActivity> GetSafetyActivities(int projectId, string userId);
    }
}
