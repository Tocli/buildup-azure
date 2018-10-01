using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IPCS.Repositories.Migrations
{
    public partial class DailyReport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectCriticalPaths_ProjectActivities_activityId",
                table: "ProjectCriticalPaths");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSafeties_ProjectActivities_activityId",
                table: "ProjectSafeties");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSafeties_SafetyIssues_safetyId",
                table: "ProjectSafeties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectWeathers",
                table: "ProjectWeathers");

            migrationBuilder.DropIndex(
                name: "IX_ProjectWeathers_ActivityId",
                table: "ProjectWeathers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectSafeties",
                table: "ProjectSafeties");

            migrationBuilder.DropIndex(
                name: "IX_ProjectSafeties_activityId",
                table: "ProjectSafeties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectCriticalPaths",
                table: "ProjectCriticalPaths");

            migrationBuilder.DropIndex(
                name: "IX_ProjectCriticalPaths_activityId",
                table: "ProjectCriticalPaths");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProjectWeathers");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProjectSafeties");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProjectCriticalPaths");

            migrationBuilder.RenameColumn(
                name: "order",
                table: "SafetyIssues",
                newName: "Order");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "SafetyIssues",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "safetyId",
                table: "ProjectSafeties",
                newName: "SafetyId");

            migrationBuilder.RenameColumn(
                name: "activityId",
                table: "ProjectSafeties",
                newName: "ActivityId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectSafeties_safetyId",
                table: "ProjectSafeties",
                newName: "IX_ProjectSafeties_SafetyId");

            migrationBuilder.RenameColumn(
                name: "endTime",
                table: "ProjectCriticalPaths",
                newName: "EndTime");

            migrationBuilder.RenameColumn(
                name: "actualStartDate",
                table: "ProjectCriticalPaths",
                newName: "ActualStartDate");

            migrationBuilder.RenameColumn(
                name: "actualEndDate",
                table: "ProjectCriticalPaths",
                newName: "ActualEndDate");

            migrationBuilder.RenameColumn(
                name: "activityId",
                table: "ProjectCriticalPaths",
                newName: "ActivityId");

            migrationBuilder.AddColumn<string>(
                name: "ExtraField",
                table: "ProjectActivities",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Class",
                table: "ActivityTypes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Column",
                table: "ActivityTypes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectWeathers",
                table: "ProjectWeathers",
                column: "ActivityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectSafeties",
                table: "ProjectSafeties",
                column: "ActivityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectCriticalPaths",
                table: "ProjectCriticalPaths",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_WeatherConditions_Name",
                table: "WeatherConditions",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SafetyIssues_Name",
                table: "SafetyIssues",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTypes_Name",
                table: "ActivityTypes",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectCriticalPaths_ProjectActivities_ActivityId",
                table: "ProjectCriticalPaths",
                column: "ActivityId",
                principalTable: "ProjectActivities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSafeties_ProjectActivities_ActivityId",
                table: "ProjectSafeties",
                column: "ActivityId",
                principalTable: "ProjectActivities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSafeties_SafetyIssues_SafetyId",
                table: "ProjectSafeties",
                column: "SafetyId",
                principalTable: "SafetyIssues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectCriticalPaths_ProjectActivities_ActivityId",
                table: "ProjectCriticalPaths");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSafeties_ProjectActivities_ActivityId",
                table: "ProjectSafeties");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSafeties_SafetyIssues_SafetyId",
                table: "ProjectSafeties");

            migrationBuilder.DropIndex(
                name: "IX_WeatherConditions_Name",
                table: "WeatherConditions");

            migrationBuilder.DropIndex(
                name: "IX_SafetyIssues_Name",
                table: "SafetyIssues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectWeathers",
                table: "ProjectWeathers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectSafeties",
                table: "ProjectSafeties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectCriticalPaths",
                table: "ProjectCriticalPaths");

            migrationBuilder.DropIndex(
                name: "IX_ActivityTypes_Name",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "ExtraField",
                table: "ProjectActivities");

            migrationBuilder.DropColumn(
                name: "Class",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "Column",
                table: "ActivityTypes");

            migrationBuilder.RenameColumn(
                name: "Order",
                table: "SafetyIssues",
                newName: "order");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "SafetyIssues",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "SafetyId",
                table: "ProjectSafeties",
                newName: "safetyId");

            migrationBuilder.RenameColumn(
                name: "ActivityId",
                table: "ProjectSafeties",
                newName: "activityId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectSafeties_SafetyId",
                table: "ProjectSafeties",
                newName: "IX_ProjectSafeties_safetyId");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "ProjectCriticalPaths",
                newName: "endTime");

            migrationBuilder.RenameColumn(
                name: "ActualStartDate",
                table: "ProjectCriticalPaths",
                newName: "actualStartDate");

            migrationBuilder.RenameColumn(
                name: "ActualEndDate",
                table: "ProjectCriticalPaths",
                newName: "actualEndDate");

            migrationBuilder.RenameColumn(
                name: "ActivityId",
                table: "ProjectCriticalPaths",
                newName: "activityId");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ProjectWeathers",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ProjectSafeties",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ProjectCriticalPaths",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectWeathers",
                table: "ProjectWeathers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectSafeties",
                table: "ProjectSafeties",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectCriticalPaths",
                table: "ProjectCriticalPaths",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectWeathers_ActivityId",
                table: "ProjectWeathers",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSafeties_activityId",
                table: "ProjectSafeties",
                column: "activityId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectCriticalPaths_activityId",
                table: "ProjectCriticalPaths",
                column: "activityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectCriticalPaths_ProjectActivities_activityId",
                table: "ProjectCriticalPaths",
                column: "activityId",
                principalTable: "ProjectActivities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSafeties_ProjectActivities_activityId",
                table: "ProjectSafeties",
                column: "activityId",
                principalTable: "ProjectActivities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSafeties_SafetyIssues_safetyId",
                table: "ProjectSafeties",
                column: "safetyId",
                principalTable: "SafetyIssues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
