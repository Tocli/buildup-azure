using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IPCS.Repositories.Migrations
{
    public partial class ProjectInfoFixes2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectInformations_ProjectLocations_LocationId",
                table: "ProjectInformations");

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                table: "ProjectInformations",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectInformations_ProjectLocations_LocationId",
                table: "ProjectInformations",
                column: "LocationId",
                principalTable: "ProjectLocations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectInformations_ProjectLocations_LocationId",
                table: "ProjectInformations");

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                table: "ProjectInformations",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectInformations_ProjectLocations_LocationId",
                table: "ProjectInformations",
                column: "LocationId",
                principalTable: "ProjectLocations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
