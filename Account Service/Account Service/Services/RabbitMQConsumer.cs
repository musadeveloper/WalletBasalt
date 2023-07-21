using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Text;
using System;
using Account_Service.Models;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace Account_Service.Services
{
    public class RabbitMQConsumer
    {
        private readonly string _hostName;
        private readonly string _userName;
        private readonly string _password;
        private readonly string _queueName;


        private Account account = new Account();

        public RabbitMQConsumer(IConfiguration configuration)
        {
            _hostName = configuration["RabbitMQ:HostName"];
            _userName = configuration["RabbitMQ:UserName"];
            _password = configuration["RabbitMQ:Password"];
            _queueName = configuration["RabbitMQ:QueueName"];

        }

        public void StartListening()
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

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var data = Encoding.UTF8.GetString(body);

                     account = JsonConvert.DeserializeObject<Account>(data);
                    

                };

                channel.BasicConsume(queue: _queueName,
                                     autoAck: true,
                                     consumer: consumer);

                Console.WriteLine("Waiting for messages...");
                Console.ReadLine();
            }

          
        }

        public Account GetReceivedAccount()
        {
            return account;
        }

    }

}
