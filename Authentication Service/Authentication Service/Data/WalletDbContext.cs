using Authentication_Service.Models;
using Microsoft.EntityFrameworkCore;


namespace Authentication_Service.Data
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
