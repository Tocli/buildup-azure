using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IPCS.Repositories.Migrations
{
    public partial class NewTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProjectCriticalPaths",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    activityId = table.Column<int>(nullable: false),
                    actualEndDate = table.Column<DateTime>(nullable: false),
                    actualStartDate = table.Column<DateTime>(nullable: false),
                    endTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectCriticalPaths", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectCriticalPaths_ProjectActivities_activityId",
                        column: x => x.activityId,
                        principalTable: "ProjectActivities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SafetyIssues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(maxLength: 32, nullable: false),
                    order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SafetyIssues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectSafeties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    activityId = table.Column<int>(nullable: false),
                    safetyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSafeties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectSafeties_ProjectActivities_activityId",
                        column: x => x.activityId,
                        principalTable: "ProjectActivities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectSafeties_SafetyIssues_safetyId",
                        column: x => x.safetyId,
                        principalTable: "SafetyIssues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCriticalPaths_activityId",
                table: "ProjectCriticalPaths",
                column: "activityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSafeties_activityId",
                table: "ProjectSafeties",
                column: "activityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSafeties_safetyId",
                table: "ProjectSafeties",
                column: "safetyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectCriticalPaths");

            migrationBuilder.DropTable(
                name: "ProjectSafeties");

            migrationBuilder.DropTable(
                name: "SafetyIssues");
        }
    }
}
