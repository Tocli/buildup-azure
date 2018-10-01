using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IPCS.Repositories.Migrations
{
    public partial class ProjectActivitiesFixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectActivities_SafetyIssues_SafetyId",
                table: "ProjectActivities");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectActivities_WeatherConditions_ConditionId",
                table: "ProjectActivities");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "ProjectActivities");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                table: "ProjectActivities",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                table: "ProjectActivities",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ActualStartDate",
                table: "ProjectActivities",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ActualEndDate",
                table: "ProjectActivities",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectActivities_WeatherConditions_ConditionId",
                table: "ProjectActivities",
                column: "ConditionId",
                principalTable: "WeatherConditions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectActivities_SafetyIssues_SafetyId",
                table: "ProjectActivities",
                column: "SafetyId",
                principalTable: "SafetyIssues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectActivities_WeatherConditions_ConditionId",
                table: "ProjectActivities");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectActivities_SafetyIssues_SafetyId",
                table: "ProjectActivities");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                table: "ProjectActivities",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                table: "ProjectActivities",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "ActualStartDate",
                table: "ProjectActivities",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "ActualEndDate",
                table: "ProjectActivities",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "ProjectActivities",
                nullable: false,
                defaultValue: "");

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
    }
}
