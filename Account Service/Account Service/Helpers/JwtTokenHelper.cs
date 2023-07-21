using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication_Service.Helpers
{
    public static class JwtTokenHelper
    {
        // Inject IConfiguration into the JwtTokenHelper class
        private static IConfiguration Configuration;

        public static void Configure(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static string GenerateJwtToken(string accountId)
        {
            // Read JWT settings from appsettings.json
            var issuer = Configuration["JwtSettings:Issuer"];
            var audience = Configuration["JwtSettings:Audience"];
            var signingKey = Configuration["JwtSettings:SigningKey"];

            // Create a secure key for signing the token (use an appropriate key size)
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));

            // Use HMAC-SHA256 algorithm for signing the token
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Set token expiration time (e.g., 1 day)
            var expirationTime = DateTime.UtcNow.AddDays(1);

            // Create token descriptor
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

            // Create token handler and generate the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Return the JWT token as a string
            return tokenHandler.WriteToken(token);
        }
    }
}
