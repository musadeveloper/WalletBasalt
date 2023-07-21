namespace Authentication_Service.Models
{
    public class TransactionHistoryModel
    {
        public int AccountId { get; set; }
        public List<TransactionModel> Transactions { get; set; }
    }
}
