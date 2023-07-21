using Authentication_Service.Data;
using Authentication_Service.Helpers;
using Authentication_Service.Models;
using Authentication_Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using StackExchange.Redis;
using System.Net;
using System.Text;

namespace Authentication_Service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly WalletDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IConnectionMultiplexer _redisConnection;
        private readonly RabbitMQProducer _rabbitMQProducer;


        public AuthController(WalletDbContext context, IConfiguration configuration, IConnectionMultiplexer redisConnection, RabbitMQProducer rabbitMQProducer)
        {
            _context = context;
            _configuration = configuration;
            _redisConnection = redisConnection;
            _rabbitMQProducer = rabbitMQProducer;
            
        }

        [AllowAnonymous]
        [HttpPost("CreateAccount")]
        public ActionResult<Account> CreateAccount(AccountCreationModel accountModel)
        {
           
            string hashedPassword = HashPassword(accountModel.Password);

            var account = new Account
            {
                AccountNumber = accountModel.AccountNumber,
                AccountHolderName = accountModel.AccountHolderName,
                Balance = accountModel.InitialBalance,
                Password = hashedPassword 
            };

            _context.Accounts.Add(account);
            _context.SaveChanges();

            return Ok(account);
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public ActionResult<Account> Login(AccountLoginModel loginModel)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.AccountNumber == loginModel.AccountNumber);

            if (account == null)
            {
                return NotFound("Account not found.");
            }

            
            bool isPasswordCorrect = VerifyPassword(loginModel.Password, account.Password);

            if (!isPasswordCorrect)
            {
                return Unauthorized("Invalid credentials.");
            }

            
            var cacheKey = $"AuthToken:{account.AccountId}";
            var cache = _redisConnection.GetDatabase();


            var cachedToken = cache.StringGet(cacheKey);
            if (cachedToken.HasValue)
            {
                
                var token = cachedToken.ToString();
                return Ok(new { Token = token });
            }

            
            var newToken = JwtTokenHelper.GenerateJwtToken(account.AccountId.ToString());

            
            cache.StringSet(cacheKey, newToken, TimeSpan.FromMinutes(10));

            _rabbitMQProducer.SendAccount(loginModel.AccountNumber);

            return Ok(new { Token = newToken, account.AccountId });
        }

        [AllowAnonymous]
        [HttpGet("GetAccountData")]
        public ActionResult<Account> GetData(int id)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.AccountId == id);
            if (account == null)
            {
                return NotFound();
            }

            return Ok(account);
        }



        private string HashPassword(string password)
        {
            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        private bool VerifyPassword(string providedPassword, string storedHash)
        {

            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(providedPassword));
            var hashedPassword = Convert.ToBase64String(hashedBytes);

            return storedHash == hashedPassword;
        }
    }
}
