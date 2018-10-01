using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IPCS.Repositories.Migrations
{
    public partial class fixeNameProjectContactAndScopeDataType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContractPerson",
                table: "ProjectContacts",
                newName: "ContactPerson");

            migrationBuilder.AlterColumn<string>(
                name: "Scope",
                table: "ProjectInformations",
                nullable: true,
                oldClrType: typeof(long));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContactPerson",
                table: "ProjectContacts",
                newName: "ContractPerson");

            migrationBuilder.AlterColumn<long>(
                name: "Scope",
                table: "ProjectInformations",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
