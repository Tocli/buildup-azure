using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IPCS.Repositories.Migrations
{
    public partial class Merge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateSubmited",
                table: "ProjectOrders",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProjectOrders",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProjectName",
                table: "ProjectInformations",
                maxLength: 60,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 32);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectContacts_ProjectId",
                table: "ProjectContacts",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectContacts_ProjectInformations_ProjectId",
                table: "ProjectContacts",
                column: "ProjectId",
                principalTable: "ProjectInformations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectContacts_ProjectInformations_ProjectId",
                table: "ProjectContacts");

            migrationBuilder.DropIndex(
                name: "IX_ProjectContacts_ProjectId",
                table: "ProjectContacts");

            migrationBuilder.DropColumn(
                name: "DateSubmited",
                table: "ProjectOrders");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProjectOrders");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectName",
                table: "ProjectInformations",
                maxLength: 32,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 60);
        }
    }
}
