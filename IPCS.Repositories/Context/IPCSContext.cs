using System;
using IPCS.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IPCS.Repositories.Context
{
    public class IPCSContext : DbContext
    {
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<ActivityType> ActivityTypes { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Entity> Entities { get; set; }
        public DbSet<ProjectActivity> ProjectActivities { get; set; }
        public DbSet<ProjectCertification> ProjectCertifications { get; set; }
        public DbSet<ProjectContact> ProjectContacts { get; set; }
        public DbSet<ProjectInformation> ProjectInformations { get; set; }
        public DbSet<ProjectDailyReport> ProjectDailyReports { get; set; }
        public DbSet<ProjectLocation> ProjectLocations { get; set; }
        public DbSet<ProjectOrder> ProjectOrders { get; set; }
        public DbSet<ProjectProperty> ProjectProperties { get; set; }
        public DbSet<ProjectStatus> ProjectStatuses { get; set; }        
        public DbSet<State> States { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<SafetyIssue> SafetyIssues { get; set; }
        //public DbSet<ProjectWeather> ProjectWeathers { get; set; }
        //public DbSet<ProjectCriticalPath> ProjectCriticalPaths { get; set; }
        //public DbSet<ProjectSafety> ProjectSafetys { get; set; }
        public DbSet<WeatherCondition> WeatherConditions { get; set; }
        
        public IPCSContext(DbContextOptions<IPCSContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActivityType>()
                .HasIndex(p => new { p.Name })
                .IsUnique(true);

            modelBuilder.Entity<SafetyIssue>()
                .HasIndex(p => new { p.Name })
                .IsUnique(true);

            modelBuilder.Entity<WeatherCondition>()
                .HasIndex(p => new { p.Name })
                .IsUnique(true);
            
        }

    }
}
