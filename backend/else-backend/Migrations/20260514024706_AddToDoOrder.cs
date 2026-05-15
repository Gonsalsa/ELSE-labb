using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace else_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddToDoOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Order",
                table: "todoItems",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "todoItems");
        }
    }
}
