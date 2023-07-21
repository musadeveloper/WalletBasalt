namespace Authentication_Service.Models
{
    public class AccountCreationModel
    {
        public string AccountNumber { get; set; }
        public string AccountHolderName { get; set; }
        public decimal InitialBalance { get; set; }

        public string Password { get; set; }
    }
}
