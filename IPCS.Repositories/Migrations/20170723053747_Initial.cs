using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IPCS.Repositories.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivityTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(maxLength: 128, nullable: false),
                    Name = table.Column<string>(maxLength: 64, nullable: false),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Currencies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 32, nullable: false),
                    Symbol = table.Column<string>(maxLength: 5, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Entities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectLocations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Address1 = table.Column<string>(maxLength: 64, nullable: false),
                    Address2 = table.Column<string>(maxLength: 64, nullable: false),
                    City = table.Column<string>(maxLength: 32, nullable: false),
                    Country = table.Column<string>(maxLength: 32, nullable: false),
                    State = table.Column<string>(maxLength: 32, nullable: false),
                    ZipCode = table.Column<string>(maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectLocations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectProperties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Field = table.Column<string>(maxLength: 32, nullable: false),
                    Value = table.Column<string>(maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectProperties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(maxLength: 32, nullable: false),
                    Name = table.Column<string>(maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WeatherConditions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 64, nullable: false),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherConditions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Budgets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Ammount = table.Column<int>(nullable: false),
                    CurrencyId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Budgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Budgets_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectContacts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CompanyName = table.Column<string>(maxLength: 64, nullable: true),
                    ContractNum = table.Column<string>(maxLength: 64, nullable: true),
                    ContractPerson = table.Column<string>(maxLength: 64, nullable: true),
                    Email = table.Column<string>(maxLength: 64, nullable: true),
                    EntityId = table.Column<int>(nullable: false),
                    ProjectId = table.Column<int>(nullable: false),
                    Tel = table.Column<string>(maxLength: 64, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectContacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectContacts_Entities_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectInformations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Apsd = table.Column<DateTime>(nullable: false),
                    BudGetId = table.Column<int>(nullable: true),
                    ContractDuration = table.Column<int>(nullable: false),
                    CoordinatesX = table.Column<string>(maxLength: 64, nullable: true),
                    CoordinatesY = table.Column<string>(maxLength: 64, nullable: true),
                    EndDate = table.Column<DateTime>(nullable: false),
                    LastModify = table.Column<DateTime>(nullable: false),
                    LastUser = table.Column<int>(nullable: false),
                    LocationId = table.Column<int>(nullable: false),
                    Npd = table.Column<DateTime>(nullable: false),
                    Opsd = table.Column<DateTime>(nullable: false),
                    OriginalCost = table.Column<int>(nullable: false),
                    ProjectName = table.Column<string>(maxLength: 32, nullable: false),
                    ProjectNumber = table.Column<string>(maxLength: 128, nullable: true),
                    RetainedAmount = table.Column<int>(nullable: false),
                    Scd = table.Column<DateTime>(nullable: false),
                    Scope = table.Column<long>(nullable: false),
                    StatusId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectInformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectInformations_Budgets_BudGetId",
                        column: x => x.BudGetId,
                        principalTable: "Budgets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectInformations_ProjectLocations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "ProjectLocations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectInformations_ProjectStatuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "ProjectStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectCertifications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CurrencyId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    From = table.Column<DateTime>(nullable: false),
                    GrossAmount = table.Column<int>(nullable: false),
                    LastModify = table.Column<DateTime>(nullable: false),
                    Paid = table.Column<bool>(nullable: false),
                    ProjectId = table.Column<int>(nullable: false),
                    To = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectCertifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectCertifications_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectCertifications_ProjectInformations_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "ProjectInformations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectDailyReports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    ProjectId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDailyReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectDailyReports_ProjectInformations_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "ProjectInformations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectOrders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    CurrencyId = table.Column<int>(nullable: false),
                    LastModify = table.Column<DateTime>(nullable: false),
                    ProjectId = table.Column<int>(nullable: false),
                    TimeExtension = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectOrders_Currencies_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectOrders_ProjectInformations_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "ProjectInformations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectActivities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(maxLength: 256, nullable: false),
                    LastModify = table.Column<DateTime>(nullable: false),
                    LastUser = table.Column<int>(nullable: false),
                    ReportId = table.Column<int>(nullable: false),
                    TypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectActivities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectActivities_ProjectDailyReports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "ProjectDailyReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectActivities_ActivityTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "ActivityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectWeathers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ActivityId = table.Column<int>(nullable: false),
                    ConditionId = table.Column<int>(nullable: false),
                    EndTime = table.Column<DateTime>(nullable: false),
                    StartTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectWeathers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectWeathers_ProjectActivities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "ProjectActivities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectWeathers_WeatherConditions_ConditionId",
                        column: x => x.ConditionId,
                        principalTable: "WeatherConditions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Budgets_CurrencyId",
                table: "Budgets",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectActivities_ReportId",
                table: "ProjectActivities",
                column: "ReportId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectActivities_TypeId",
                table: "ProjectActivities",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCertifications_CurrencyId",
                table: "ProjectCertifications",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCertifications_ProjectId",
                table: "ProjectCertifications",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectContacts_EntityId",
                table: "ProjectContacts",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDailyReports_ProjectId",
                table: "ProjectDailyReports",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectInformations_BudGetId",
                table: "ProjectInformations",
                column: "BudGetId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectInformations_LocationId",
                table: "ProjectInformations",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectInformations_StatusId",
                table: "ProjectInformations",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectOrders_CurrencyId",
                table: "ProjectOrders",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectOrders_ProjectId",
                table: "ProjectOrders",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectWeathers_ActivityId",
                table: "ProjectWeathers",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectWeathers_ConditionId",
                table: "ProjectWeathers",
                column: "ConditionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectCertifications");

            migrationBuilder.DropTable(
                name: "ProjectContacts");

            migrationBuilder.DropTable(
                name: "ProjectOrders");

            migrationBuilder.DropTable(
                name: "ProjectProperties");

            migrationBuilder.DropTable(
                name: "ProjectWeathers");

            migrationBuilder.DropTable(
                name: "Entities");

            migrationBuilder.DropTable(
                name: "ProjectActivities");

            migrationBuilder.DropTable(
                name: "WeatherConditions");

            migrationBuilder.DropTable(
                name: "ProjectDailyReports");

            migrationBuilder.DropTable(
                name: "ActivityTypes");

            migrationBuilder.DropTable(
                name: "ProjectInformations");

            migrationBuilder.DropTable(
                name: "Budgets");

            migrationBuilder.DropTable(
                name: "ProjectLocations");

            migrationBuilder.DropTable(
                name: "ProjectStatuses");

            migrationBuilder.DropTable(
                name: "Currencies");
        }
    }
}
