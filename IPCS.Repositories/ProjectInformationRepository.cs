using System;
using IPCS.Entities;
using IPCS.Repositories.Context;
using Microsoft.EntityFrameworkCore;
using IPCS.Generic.Repositories;
using IPCS.Generic.Repositories.Paginators;
using System.Linq;
using IPCS.Generic.Repositories.Extensions;
using System.Collections.Generic;

namespace IPCS.Repositories
{
    public class ProjectInformationRepository : GenericRepository<ProjectInformation>, IProjectInformationRepository
    {
        public ProjectInformationRepository(IPCSContext context) : base(context)
        {

        }

        public override async System.Threading.Tasks.Task<System.Collections.Generic.List<ProjectInformation>> List()
        {
            var result = await ((IPCSContext)this.dbContext).ProjectInformations.Include(i => i.ProjectLocation)
                                                            .Include(i => i.ProjectStatus)
                                                            .Include(i => i.Budget).ToListAsync();

            return result;
        }

        public override Generic.Repositories.Paginators.Paginator<ProjectInformation> List(int page, int rowsPage)
        {
            return new Paginator<ProjectInformation>
            {
                Result = dbSet.Skip<ProjectInformation>(page * rowsPage).Take<ProjectInformation>(rowsPage)
                              .Include(i => i.ProjectLocation)
                              .Include(i => i.ProjectStatus)
                              .ToList<ProjectInformation>(),
                TotalRow = dbSet.Count<ProjectInformation>()
            };
        }

        public Paginator<ProjectInformation> ListProjects(int page, int rowsPage, string valueFilter, string orderBy, string userId, bool isAdmin, bool desc = false, int statusId = 1)
        {
            var query = dbSet.AsQueryable();
            if (!isAdmin)
            {
                query = query.Where(w => w.OwnerUser == userId).AsQueryable();
            }
            if (orderBy == "ProjectLocation")
            {
                if (desc)
                {
                    query = query.OrderByDescending(o => o.ProjectLocation.Address1).AsQueryable();
                    query = query.OrderByDescending(o => o.ProjectLocation.Address2).AsQueryable();
                }
                else
                {
                    query = query.OrderBy(o => o.ProjectLocation.Address1).AsQueryable();
                    query = query.OrderBy(o => o.ProjectLocation.Address2).AsQueryable();
                }

            }
            else if (!string.IsNullOrEmpty(orderBy))
            {
                query = query.OrderBy(orderBy, desc).AsQueryable();
            }


            //int statusId = GetStatusId("Deleted");
            if (statusId > 0)
            {
                query = query.Where(w => w.StatusId == statusId);
            }

            if (valueFilter != null && valueFilter.Length > 0)
            {
                query = query.Where(w => w.ProjectName.Contains(valueFilter) || w.ProjectNumber.Contains(valueFilter));
            }

            return new Paginator<ProjectInformation>
            {
                Result = query.Skip<ProjectInformation>(page * rowsPage).Take<ProjectInformation>(rowsPage)
                              .Include(i => i.ProjectLocation)
                              .Include(i => i.Budget)
                              .Include(i => i.ProjectStatus)
                              .ToList<ProjectInformation>(),
                TotalRow = query.Count<ProjectInformation>()
            };
        }

        public ProjectInformation Get(int id, string userId, bool isAdmin)
        {
            if (isAdmin)
            {
                return ((IPCSContext)this.dbContext).ProjectInformations
                                                .Where(w => w.Id == int.Parse(id.ToString()))
                                                .Include(i => i.ProjectLocation)
                                                .FirstOrDefault();
            }
            else
            {
                return ((IPCSContext)this.dbContext).ProjectInformations
                                                .Where(w => w.Id == int.Parse(id.ToString()) && w.OwnerUser == userId)
                                                .Include(i => i.ProjectLocation)
                                                .FirstOrDefault();

            }

        }

        public override ProjectInformation Insert(ProjectInformation entity)
        {
            entity.StatusId = ((IPCSContext)this.dbContext).ProjectStatuses.Find(1).Id;
            entity.Created = DateTime.Now;
            entity.LastModify = DateTime.Now;
            return base.Insert(entity);
        }

        public override ProjectInformation Update(ProjectInformation entity)
        {
            entity.LastModify = DateTime.Now;
            return base.Update(entity);
        }

        public void DeleteProject(int id)
        {
            int statusId = GetStatusId("Deleted");

            var delProject = ((IPCSContext)this.dbContext).ProjectInformations
                .Where(w => w.Id == id).SingleOrDefault();
            delProject.StatusId = statusId;
            base.Update(delProject);

        }

        public List<ProjectOrder> GetProjectOrderForDashBoard(object id)
        {

            return ((IPCSContext)this.dbContext).ProjectOrders
                            .Where(w => w.ProjectId == int.Parse(id.ToString()))
                            .Include(i => i.Currency)
                            .Include(i => i.ProjectInformation)
                            .ToList();

        }
        
        
        public int GetStatusId(string desc)
        {
            int idDescription = ((IPCSContext)this.dbContext).ProjectStatuses
                .Where(w => w.Description == desc).SingleOrDefault().Id;

            return idDescription;
        }

        public List<ProjectCertification> GetProjectCertificationForDashBoard(object id)
        {
            return ((IPCSContext)this.dbContext).ProjectCertifications
                          .Where(w => w.ProjectId == int.Parse(id.ToString()))
                          .Include(i => i.Currency)
                         .ToList();
        }

        public ProjectInformation GetProjectInformationForDashBoard(int id)
        {
            var context = ((IPCSContext)this.dbContext);
            var projectInformation = context.ProjectInformations.Where(w => w.Id == id)
                .Include(i => i.ProjectCertifications)
                .Include(i => i.ProjectOrders)
                .Include(i => i.Budget)
                .Include(i => i.Budget.Currency)
                .Include(i => i.ProjectContacts)
                .Include("ProjectContacts.Entity")
                .Include(i => i.ProjectLocation).SingleOrDefault();
            if(projectInformation != null)
            {
                projectInformation.ProjectDailyReports = new List<ProjectDailyReport>();
                var dailyReport = context.ProjectDailyReports.Where(w => w.ProjectId == projectInformation.Id);
                var dailyReportDate = dailyReport.Max(m => m.Date);
                var dailyReportId = dailyReport.Where(w => w.Date == dailyReportDate).Select(s => s.Id).FirstOrDefault();
                if (dailyReportId != 0)
                {
                    dailyReport = context.ProjectDailyReports.Where(w => w.Id == dailyReportId)
                        .Include(i => i.ProjectActivities)
                        .Include("ProjectActivities.ActivityType")
                        .Include("ProjectActivities.WeatherCondition")
                        .Include("ProjectActivities.SafetyIssue");
                    projectInformation.ProjectDailyReport = dailyReport.First();
                }
            }

            if (projectInformation.ProjectDailyReport != null)
            {
                if (projectInformation.ProjectDailyReport.ProjectActivities != null
                    && projectInformation.ProjectDailyReport.ProjectActivities.Any())
                {
                    foreach (var item in projectInformation.ProjectDailyReport.ProjectActivities)
                    {
                        item.DailyReportDate = projectInformation.ProjectDailyReport.Date;
                    }
                }
            }   

            return projectInformation;
        }

        public Budget GetBudgetForDashBoard(object id)
        {
            return ((IPCSContext)this.dbContext).Budgets
                            .Where(w => w.Id == int.Parse(id.ToString()))
                            .FirstOrDefault();
        }

        public List<ProjectContact> GetProjectContactsForDashBoard(object id) {
            return ((IPCSContext)this.dbContext).ProjectContacts
                .Where(w => w.ProjectId == int.Parse(id.ToString()))
                .Include(i => i.Entity)
                .ToList();
        }

        public List<ProjectActivity> GetProjecActivityForDashBoard(object id)
        {
            var a = ((IPCSContext)this.dbContext).ProjectActivities
                .Where(w => w.ProjectDailyReport.ProjectId == int.Parse(id.ToString()))
                .Include(i => i.ActivityType)
                .Include(i => i.ProjectDailyReport)
                .Include(i => i.SafetyIssue)
                .ToList();
            return a;
        }

        public void UpdateRetainedAmount(object id, object retainedAmout)
        {
            var projectInfo = ((IPCSContext)this.dbContext).ProjectInformations.Find(id);
            projectInfo.RetainedAmount = decimal.Parse(retainedAmout.ToString());
            ((IPCSContext)this.dbContext).ProjectInformations.Update(projectInfo);
            this.dbContext.SaveChanges();

        }

        public void UpdateLastModify(object id, object lastModify)
        {
            var projectInfo = ((IPCSContext)this.dbContext).ProjectInformations.Find(id);
            projectInfo.LastModify = DateTime.Parse(lastModify.ToString());
            ((IPCSContext)this.dbContext).ProjectInformations.Update(projectInfo);
            this.dbContext.SaveChanges();
        }

        public bool IsOwner(int projectId, string userId)
        {
            return this.dbContext.Set<ProjectInformation>().Where(w => w.Id == projectId && w.OwnerUser == userId).Count() == 1;
        }
    }
}
