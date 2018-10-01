using System;
using IPCS.Entities;
using IPCS.Repositories;
using IPCS.Generic.Services;
using IPCS.Models;
using System.Collections.Generic;

namespace IPCS.Services
{
    public class ProjectDailyReportService : GenericService<ProjectDailyReport>, IProjectDailyReportService
    {
        public ProjectDailyReportService(IProjectDailyReportRepository projectDailyReportRepository) : base(projectDailyReportRepository)
        {
        }

        public ProjectDailyReport GetProjectDailyReportByDate(GetDailyReportByDateRequestModel request,string userId)
        {
            return ((IProjectDailyReportRepository)this.genericRepository).GetProjectDailyReportByDate(request.ProjectId,request.Date,userId);
        }

        public List<ProjectActivity> GetSafetyActivities(int projectId, string userId)
        {
            return ((IProjectDailyReportRepository)this.genericRepository).GetSafetyActivities(projectId, userId);
        }
    }
}
