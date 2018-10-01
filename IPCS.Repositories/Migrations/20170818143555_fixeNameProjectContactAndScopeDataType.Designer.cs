using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using IPCS.Repositories.Context;

namespace IPCS.Repositories.Migrations
{
    [DbContext(typeof(IPCSContext))]
    [Migration("20170818143555_fixeNameProjectContactAndScopeDataType")]
    partial class fixeNameProjectContactAndScopeDataType
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("IPCS.Entities.ActivityType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.Property<int>("Order");

                    b.HasKey("Id");

                    b.ToTable("ActivityTypes");
                });

            modelBuilder.Entity("IPCS.Entities.Budget", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Ammount");

                    b.Property<int>("CurrencyId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.ToTable("Budgets");
                });

            modelBuilder.Entity("IPCS.Entities.City", b =>
                {
                    b.Property<string>("Code")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<bool>("ListAvailable");

                    b.Property<string>("StateCode");

                    b.HasKey("Code");

                    b.HasIndex("StateCode");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("IPCS.Entities.Country", b =>
                {
                    b.Property<string>("Code")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<bool>("ListAvailable");

                    b.HasKey("Code");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("IPCS.Entities.Currency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<string>("Symbol")
                        .IsRequired()
                        .HasMaxLength(5);

                    b.HasKey("Id");

                    b.ToTable("Currencies");
                });

            modelBuilder.Entity("IPCS.Entities.Entity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.HasKey("Id");

                    b.ToTable("Entities");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectActivity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<DateTime>("LastModify");

                    b.Property<int>("LastUser");

                    b.Property<int>("ReportId");

                    b.Property<int>("TypeId");

                    b.HasKey("Id");

                    b.HasIndex("ReportId");

                    b.HasIndex("TypeId");

                    b.ToTable("ProjectActivities");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectCertification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("CurrencyId");

                    b.Property<DateTime>("Date");

                    b.Property<DateTime>("From");

                    b.Property<int>("GrossAmount");

                    b.Property<DateTime>("LastModify");

                    b.Property<bool>("Paid");

                    b.Property<int>("ProjectId");

                    b.Property<DateTime>("To");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectCertifications");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectContact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CompanyName")
                        .HasMaxLength(64);

                    b.Property<string>("ContactPerson")
                        .HasMaxLength(64);

                    b.Property<string>("ContractNum")
                        .HasMaxLength(64);

                    b.Property<string>("Email")
                        .HasMaxLength(64);

                    b.Property<int>("EntityId");

                    b.Property<int>("ProjectId");

                    b.Property<string>("Tel")
                        .HasMaxLength(64);

                    b.HasKey("Id");

                    b.HasIndex("EntityId");

                    b.ToTable("ProjectContacts");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectCriticalPath", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("activityId");

                    b.Property<DateTime>("actualEndDate");

                    b.Property<DateTime>("actualStartDate");

                    b.Property<DateTime>("endTime");

                    b.HasKey("Id");

                    b.HasIndex("activityId");

                    b.ToTable("ProjectCriticalPaths");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectDailyReport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("ProjectId");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectDailyReports");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("Apsd");

                    b.Property<int?>("BudGetId");

                    b.Property<int>("ConstructDuration");

                    b.Property<int>("ContractDuration");

                    b.Property<string>("CoordinatesX")
                        .HasMaxLength(64);

                    b.Property<string>("CoordinatesY")
                        .HasMaxLength(64);

                    b.Property<DateTime>("Created");

                    b.Property<DateTime?>("EndDate");

                    b.Property<DateTime>("LastModify");

                    b.Property<int>("LastUser");

                    b.Property<int>("LocationId");

                    b.Property<DateTime?>("Npd");

                    b.Property<DateTime?>("Opsd");

                    b.Property<decimal>("OriginalCost");

                    b.Property<string>("ProjectName")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<string>("ProjectNumber")
                        .HasMaxLength(128);

                    b.Property<decimal>("RetainedAmount");

                    b.Property<DateTime?>("Scd");

                    b.Property<string>("Scope");

                    b.Property<int>("StatusId");

                    b.HasKey("Id");

                    b.HasIndex("BudGetId");

                    b.HasIndex("LocationId");

                    b.HasIndex("StatusId");

                    b.ToTable("ProjectInformations");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address1")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.Property<string>("Address2")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<string>("State")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<string>("ZipCode")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.HasKey("Id");

                    b.ToTable("ProjectLocations");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectOrder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Amount");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int>("CurrencyId");

                    b.Property<DateTime>("LastModify");

                    b.Property<int>("ProjectId");

                    b.Property<int>("TimeExtension");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CurrencyId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectOrders");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectProperty", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Field")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.HasKey("Id");

                    b.ToTable("ProjectProperties");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectSafety", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("activityId");

                    b.Property<int>("safetyId");

                    b.HasKey("Id");

                    b.HasIndex("activityId");

                    b.HasIndex("safetyId");

                    b.ToTable("ProjectSafeties");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.HasKey("Id");

                    b.ToTable("ProjectStatuses");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectWeather", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ActivityId");

                    b.Property<int>("ConditionId");

                    b.Property<DateTime>("EndTime");

                    b.Property<DateTime>("StartTime");

                    b.HasKey("Id");

                    b.HasIndex("ActivityId");

                    b.HasIndex("ConditionId");

                    b.ToTable("ProjectWeathers");
                });

            modelBuilder.Entity("IPCS.Entities.SafetyIssue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(32);

                    b.Property<int>("order");

                    b.HasKey("Id");

                    b.ToTable("SafetyIssues");
                });

            modelBuilder.Entity("IPCS.Entities.State", b =>
                {
                    b.Property<string>("Code")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CountryCode");

                    b.Property<string>("Description");

                    b.Property<bool>("ListAvailable");

                    b.HasKey("Code");

                    b.HasIndex("CountryCode");

                    b.ToTable("States");
                });

            modelBuilder.Entity("IPCS.Entities.WeatherCondition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.Property<int>("Order");

                    b.HasKey("Id");

                    b.ToTable("WeatherConditions");
                });

            modelBuilder.Entity("IPCS.Entities.Budget", b =>
                {
                    b.HasOne("IPCS.Entities.Currency", "Currency")
                        .WithMany("Budgets")
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.City", b =>
                {
                    b.HasOne("IPCS.Entities.State", "State")
                        .WithMany()
                        .HasForeignKey("StateCode");
                });

            modelBuilder.Entity("IPCS.Entities.ProjectActivity", b =>
                {
                    b.HasOne("IPCS.Entities.ProjectDailyReport", "ProjectDailyReport")
                        .WithMany("ProjectActivities")
                        .HasForeignKey("ReportId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IPCS.Entities.ActivityType", "ActivityType")
                        .WithMany("ProjectActivities")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.ProjectCertification", b =>
                {
                    b.HasOne("IPCS.Entities.Currency", "Currency")
                        .WithMany("ProjectCertifications")
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IPCS.Entities.ProjectInformation", "ProjectInformation")
                        .WithMany("ProjectCertifications")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.ProjectContact", b =>
                {
                    b.HasOne("IPCS.Entities.Entity", "Entity")
                        .WithMany("ProjectContacts")
                        .HasForeignKey("EntityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.ProjectCriticalPath", b =>
                {
                    b.HasOne("IPCS.Entities.ProjectActivity", "ProjectActivity")
                        .WithMany("ProjectCriticalPaths")
                        .HasForeignKey("activityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.ProjectDailyReport", b =>
                {
                    b.HasOne("IPCS.Entities.ProjectInformation", "ProjectInformation")
                        .WithMany("ProjectDailyReports")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.ProjectInformation", b =>
                {
                    b.HasOne("IPCS.Entities.Budget", "Budget")
                        .WithMany("ProjectInformations")
                        .HasForeignKey("BudGetId");

                    b.HasOne("IPCS.Entities.ProjectLocation", "ProjectLocation")
                        .WithMany("ProjectInformations")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IPCS.Entities.ProjectStatus", "ProjectStatus")
                        .WithMany("ProjectInformations")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.ProjectOrder", b =>
                {
                    b.HasOne("IPCS.Entities.Currency", "Currency")
                        .WithMany("ProjectOrders")
                        .HasForeignKey("CurrencyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IPCS.Entities.ProjectInformation", "ProjectInformation")
                        .WithMany("ProjectOrders")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.ProjectSafety", b =>
                {
                    b.HasOne("IPCS.Entities.ProjectActivity", "ProjectActivity")
                        .WithMany("ProjectSafeties")
                        .HasForeignKey("activityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IPCS.Entities.SafetyIssue", "SafetyIssue")
                        .WithMany("ProjectSafeties")
                        .HasForeignKey("safetyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.ProjectWeather", b =>
                {
                    b.HasOne("IPCS.Entities.ProjectActivity", "ProjectActivity")
                        .WithMany("ProjectWeathers")
                        .HasForeignKey("ActivityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("IPCS.Entities.WeatherCondition", "WeatherCondition")
                        .WithMany("ProjectWeathers")
                        .HasForeignKey("ConditionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("IPCS.Entities.State", b =>
                {
                    b.HasOne("IPCS.Entities.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryCode");
                });
        }
    }
}
