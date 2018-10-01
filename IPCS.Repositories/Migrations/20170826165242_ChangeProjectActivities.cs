using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IPCS.Repositories.Migrations
{
    public partial class ChangeProjectActivities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectCriticalPaths");

            migrationBuilder.DropTable(
                name: "ProjectSafeties");

            migrationBuilder.DropTable(
                name: "ProjectWeathers");

            migrationBuilder.AlterColumn<string>(
                name: "Scope",
                table: "ProjectInformations",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "ProjectActivities",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SafetyId",
                table: "ProjectActivities",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ConditionId",
                table: "ProjectActivities",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "ProjectActivities",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "ProjectActivities",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectActivities_SafetyId",
                table: "ProjectActivities",
                column: "SafetyId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectActivities_ConditionId",
                table: "ProjectActivities",
                column: "ConditionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectActivities_SafetyIssues_SafetyId",
                table: "ProjectActivities",
                column: "SafetyId",
                principalTable: "SafetyIssues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectActivities_WeatherConditions_ConditionId",
                table: "ProjectActivities",
                column: "ConditionId",
                principalTable: "WeatherConditions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectActivities_SafetyIssues_SafetyId",
                table: "ProjectActivities");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectActivities_WeatherConditions_ConditionId",
                table: "ProjectActivities");

            migrationBuilder.DropIndex(
                name: "IX_ProjectActivities_SafetyId",
                table: "ProjectActivities");

            migrationBuilder.DropIndex(
                name: "IX_ProjectActivities_ConditionId",
                table: "ProjectActivities");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "ProjectActivities");

            migrationBuilder.DropColumn(
                name: "SafetyId",
                table: "ProjectActivities");

            migrationBuilder.DropColumn(
                name: "ConditionId",
                table: "ProjectActivities");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "ProjectActivities");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "ProjectActivities");

            migrationBuilder.AlterColumn<long>(
                name: "Scope",
                table: "ProjectInformations",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ProjectCriticalPaths",
                columns: table => new
                {
                    ActivityId = table.Column<int>(nullable: false),
                    ActualEndDate = table.Column<DateTime>(nullable: false),
                    ActualStartDate = table.Column<DateTime>(nullable: false),
                    EndTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectCriticalPaths", x => x.ActivityId);
                    table.ForeignKey(
                        name: "FK_ProjectCriticalPaths_ProjectActivities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "ProjectActivities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectSafeties",
                columns: table => new
                {
                    ActivityId = table.Column<int>(nullable: false),
                    SafetyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSafeties", x => x.ActivityId);
                    table.ForeignKey(
                        name: "FK_ProjectSafeties_ProjectActivities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "ProjectActivities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectSafeties_SafetyIssues_SafetyId",
                        column: x => x.SafetyId,
                        principalTable: "SafetyIssues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectWeathers",
                columns: table => new
                {
                    ActivityId = table.Column<int>(nullable: false),
                    ConditionId = table.Column<int>(nullable: false),
                    EndTime = table.Column<DateTime>(nullable: false),
                    StartTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectWeathers", x => x.ActivityId);
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
                name: "IX_ProjectSafeties_SafetyId",
                table: "ProjectSafeties",
                column: "SafetyId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectWeathers_ConditionId",
                table: "ProjectWeathers",
                column: "ConditionId");
        }
    }
}
