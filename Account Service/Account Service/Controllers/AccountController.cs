using Account_Service.Data;
using Account_Service.Models;
using Account_Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;

namespace Account_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly WalletDbContext _context;
        private readonly IConfiguration _configuration;
        

        public AccountController(WalletDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            


        }

        [AllowAnonymous]
        [HttpGet("{accountId}/TransactionHistory")]
        public ActionResult<TransactionHistoryModel> GetTransactionHistory(int accountId)
        {
            var account = _context.Transactions.FirstOrDefault(a => a.AccountId == accountId);

            if (account == null)
            {
                return NotFound("Account not found.");
            }

            var transactions = _context.Transactions.Where(t => t.AccountId == accountId).ToList();
            var transactionHistory = new TransactionHistoryModel
            {
                AccountId = accountId,
                Transactions = transactions
            };

            return Ok(transactionHistory);
        }

        [AllowAnonymous]
        [HttpGet("{accountId}/Balance")]
        public ActionResult<decimal> GetAccountBalance(int accountId)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.AccountId == accountId);

            if (account == null)
            {
                return NotFound("Account not found.");
            }

            return Ok(account.Balance);
        }

        [AllowAnonymous]
        [HttpPost("{accountId}/Credit")]
        public ActionResult<TransactionModel> CreditAccount(int accountId, TransactionModel creditModel)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.AccountId == accountId);

            if (account == null)
            {
                return NotFound("Account not found.");
            }

            account.Balance += creditModel.Amount;

            var transaction = new TransactionModel
            {
                AccountId = accountId,
                Amount = creditModel.Amount,
                Type = "Credit",
                TransactionDate = DateTime.Now
            };

            _context.Transactions.Add(transaction);
            _context.SaveChanges();

            return Ok(transaction);
        }

        [AllowAnonymous]
        [HttpPost("{accountId}/Debit")]
        public ActionResult<TransactionModel> DebitAccount(int accountId, TransactionModel debitModel)
        {
            // Implement your debit account logic using the database

             var account = _context.Accounts.FirstOrDefault(a => a.AccountId == accountId);

            if (account == null)
            {
                return NotFound("Account not found.");
            }

            if (debitModel.Amount > account.Balance)
            {
                return BadRequest("Insufficient balance.");
            }

            account.Balance -= debitModel.Amount;

            var transaction = new TransactionModel
            {
                AccountId = accountId,
                Amount = debitModel.Amount,
                Type = "Debit",
                TransactionDate = DateTime.Now
            };

            _context.Transactions.Add(transaction);
            _context.SaveChanges();

            return Ok(transaction);
        }

    }
}
