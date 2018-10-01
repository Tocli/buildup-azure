using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IPCS.Repositories.Migrations
{
    public partial class AddOwnerUseId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "LastUser",
                table: "ProjectInformations",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "OwnerUser",
                table: "ProjectInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerUser",
                table: "ProjectInformations");

            migrationBuilder.AlterColumn<int>(
                name: "LastUser",
                table: "ProjectInformations",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
