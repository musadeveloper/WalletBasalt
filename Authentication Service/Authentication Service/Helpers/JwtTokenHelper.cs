using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication_Service.Helpers
{
    public static class JwtTokenHelper
    {
       
        private static IConfiguration Configuration;

        public static void Configure(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static string GenerateJwtToken(string accountId)
        {
            
            var issuer = Configuration["JwtSettings:Issuer"];
            var audience = Configuration["JwtSettings:Audience"];
            var signingKey = Configuration["JwtSettings:SigningKey"];

            
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));

           
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            
            var expirationTime = DateTime.UtcNow.AddDays(1);

            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("AccountId", accountId)
                }),
                Issuer = issuer,
                Audience = audience,
                Expires = expirationTime,
                SigningCredentials = signingCredentials
            };

            
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            
            return tokenHandler.WriteToken(token);
        }
    }
}
