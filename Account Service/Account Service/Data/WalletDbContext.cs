using Account_Service.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Security.Principal;
namespace Account_Service.Data
{
    public class WalletDbContext : DbContext
    {

        public DbSet<Account> Accounts { get; set; }
        public DbSet<TransactionModel> Transactions { get; set; }


        public WalletDbContext(DbContextOptions<WalletDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
