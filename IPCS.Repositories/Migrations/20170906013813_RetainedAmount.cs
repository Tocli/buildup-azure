using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IPCS.Repositories.Migrations
{
    public partial class RetainedAmount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "ProjectOrders",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "GrossAmount",
                table: "ProjectCertifications",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<decimal>(
                name: "RetainedAmount",
                table: "ProjectCertifications",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RetainedAmount",
                table: "ProjectCertifications");

            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "ProjectOrders",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<int>(
                name: "GrossAmount",
                table: "ProjectCertifications",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
