using System.ComponentModel.DataAnnotations;

namespace Authentication_Service.Models
{
    public class TransactionModel
    {
        [Key]
        public int TransactionId { get; set; }
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; } 
        public DateTime TransactionDate { get; set; }
    }
}
