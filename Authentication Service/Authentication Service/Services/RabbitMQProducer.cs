using Authentication_Service.Data;
using Authentication_Service.Models;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace Authentication_Service.Services
{
    public class RabbitMQProducer
    {
        private readonly string _hostName;
        private readonly string _userName;
        private readonly string _password;
        private readonly string _queueName;

        private readonly WalletDbContext _context;


        public RabbitMQProducer(WalletDbContext context, IConfiguration configuration)
        {
            _context = context;

            _hostName = configuration["RabbitMQ:HostName"];
            _userName = configuration["RabbitMQ:UserName"];
            _password = configuration["RabbitMQ:Password"];
            _queueName = configuration["RabbitMQ:QueueName"];
        }

        public void SendAccount(string AccountNumber)
        {
            var factory = new ConnectionFactory
            {
                HostName = _hostName,
                UserName = _userName,
                Password = _password
            };

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: _queueName,
                                     durable: true,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                var account = _context.Accounts.FirstOrDefault(a => a.AccountNumber == AccountNumber);

                var data = JsonSerializer.Serialize(account);

                var body = Encoding.UTF8.GetBytes(data);

                channel.BasicPublish(exchange: "",
                                     routingKey: _queueName,
                                     basicProperties: null,
                                     body: body);
            }
        }
    }
}