using System;
using IPCS.Entities;
using IPCS.Repositories.Context;
using IPCS.Generic.Repositories;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace IPCS.Repositories
{
    public class ProjectDailyReportRepository : GenericRepository<ProjectDailyReport>, IProjectDailyReportRepository
    {
        public ProjectDailyReportRepository(IPCSContext context) : base(context)
        {

        }

        public List<ProjectActivity> GetSafetyActivities(int projectId, string userId)
        {
            var dailyReportList = ((IPCSContext)this.dbContext).ProjectDailyReports
                .Where(w => w.ProjectId == projectId)
                .Include(i => i.ProjectActivities)
                .ToList();
            
            var projectSafetyActivities = new List<ProjectActivity>();

            foreach (var item in dailyReportList)
            {
                foreach (var pa in item.ProjectActivities)
                {
                    if (pa.SafetyId != null)
                    {
                        projectSafetyActivities.Add(pa);
                    }
                }
            }

            return projectSafetyActivities;
           
        }

        public ProjectDailyReport GetProjectDailyReportByDate(int projectId, DateTime date, string userId)
        {
            var context = (IPCSContext)this.dbContext;
            var dailyReport = context.ProjectDailyReports
                .Where(w => w.ProjectId == projectId
                && new DateTime(w.Date.Year, w.Date.Month, w.Date.Day) == new DateTime(date.Year, date.Month, date.Day))
                .FirstOrDefault();

            if (dailyReport == null)
            {
                var minDailyReport = context.ProjectDailyReports
                .Where(w => w.ProjectId == projectId
                && new DateTime(w.Date.Year, w.Date.Month, w.Date.Day) < new DateTime(date.Year, date.Month, date.Day))
                .OrderByDescending(o => o.Date)
                .FirstOrDefault();

                dailyReport = new ProjectDailyReport
                {
                    ProjectId = projectId,
                    Date = date,
                    ProjectActivities = new List<ProjectActivity>()

                };

                if (minDailyReport != null)
                {
                    dailyReport.ProjectActivities = context.ProjectActivities
                        .Where(w => w.TypeId != 6 && w.ProjectDailyReport.Id == minDailyReport.Id)
                        .Include(i => i.SafetyIssue)
                        .Include(i => i.WeatherCondition)
                        .Include(i => i.ActivityType)
                        .ToList();
                   
                    foreach (var item in dailyReport.ProjectActivities)
                    {
                        var dailyReportProjectDraft = context.ProjectDailyReports
                        .Where(w => w.Id == item.ReportId)
                        .SingleOrDefault();
                        item.DraftDate = dailyReportProjectDraft.Date;
                        if (item.ActivityType.SubType == 5 || item.ActivityType.SubType == 3)
                        {
                            item.IsDraft = false;
                        }
                        else
                        {
                            item.IsDraft = true;
                        }
                        item.ActivityType = null;
                    }
                }
            }
            else
            {
                dailyReport.ProjectActivities = context.ProjectActivities
                    .Where(w => w.ProjectDailyReport.Id == dailyReport.Id)
                    .Include(i => i.SafetyIssue)
                    .Include(i => i.WeatherCondition)
                    .ToList();
                //New Added By Juan
                foreach (var item in dailyReport.ProjectActivities)
                {
                    item.IsDraft = false;
                    item.DailyReportDate = date;
                }
            }
            
            return dailyReport;
        }

        public override ProjectDailyReport Insert(ProjectDailyReport entity)
        {
            foreach (var item in entity.ProjectActivities)
            {
                item.Id = 0;
                item.ProjectDailyReport = entity;
                item.ReportId = 0;
            }
            var maxDailyReportId = ((IPCSContext)this.dbContext).ProjectDailyReports.Where(w => w.ProjectId == entity.ProjectId).Max(m => m.Id);
            var criticalPathList = ((IPCSContext)this.dbContext).ProjectActivities
                .Where(w => w.ProjectDailyReport.ProjectId == entity.ProjectId &&
            w.TypeId == 5 && w.ProjectDailyReport.Id == maxDailyReportId).ToList();
            List<ProjectActivity> addActivities = new List<ProjectActivity>();
            foreach (var item in criticalPathList)
            {
                var activityEdit = entity.ProjectActivities.Where(w => w.Id == item.Id && w.TypeId == 5).SingleOrDefault();
                if (activityEdit == null)
                {
                    ((IPCSContext)this.dbContext).Entry<ProjectActivity>(item).State = EntityState.Detached;
                    item.Id = 0;
                    item.ProjectDailyReport = entity;
                    item.ReportId = 0;
                    addActivities.Add(item);
                }

            }

            entity.ProjectActivities.AddRange(addActivities);
            foreach (var item in entity.ProjectActivities)
            {
                item.LastModify = DateTime.Now;
                if (item.SafetyIssue != null)
                {
                    item.SafetyIssue = null;
                }
                if (item.WeatherCondition != null)
                {
                    item.WeatherCondition = null;
                }

            }
            base.Insert(entity);
            foreach (var item in entity.ProjectActivities)
            {
                item.IsDraft = false;
                item.DailyReportDate = entity.Date;
            }
             var dailyReportResponse = ((IPCSContext)this.dbContext).ProjectDailyReports
            .Where(w => w.Id == entity.Id)
            .Include(i => i.ProjectActivities)
            .Include("ProjectActivities.SafetyIssue")
            .Include("ProjectActivities.WeatherCondition")
            .Single();
            foreach (var item in dailyReportResponse.ProjectActivities)
            {
                item.DailyReportDate = entity.Date;
            }
            return dailyReportResponse;
        }

        public override ProjectDailyReport Update(ProjectDailyReport entity)
        {
            foreach (var item in entity.ProjectActivities)
            {
                item.LastModify = DateTime.Now;
                if (item.SafetyIssue != null)
                {
                    item.SafetyIssue = null;
                }
                if (item.WeatherCondition != null)
                {
                    item.WeatherCondition = null;
                }

            }
            entity = base.Update(entity);
            var dailyReportResponse = ((IPCSContext)this.dbContext).ProjectDailyReports
                .Where(w => w.Id == entity.Id)
                .Include(i => i.ProjectActivities)
                .Include("ProjectActivities.SafetyIssue")
                .Include("ProjectActivities.WeatherCondition")
                .Single();
            foreach (var item in dailyReportResponse.ProjectActivities)
            {
                item.DailyReportDate = entity.Date;
            }
            return dailyReportResponse;
        }

    }
}
