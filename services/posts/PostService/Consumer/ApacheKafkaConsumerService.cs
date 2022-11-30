using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confluent.Kafka;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using PostService.Data;

namespace PostService.Consumer
{
    public class ApacheKafkaConsumerService : IHostedService
    {
        private readonly AppDBContext dbContext;

        private const string Topic = "users";
        private const string GroupId = "blog";
        private readonly string bootstrapServers = $"{Environment.GetEnvironmentVariable("KAFKA_HOST")}:9092";

        public ApacheKafkaConsumerService(AppDBContext context)
        {
            dbContext = context;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            var config = new ConsumerConfig
            {
                GroupId = GroupId,
                BootstrapServers = bootstrapServers,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };

            try
            {
                using (var consumerBuilder = new ConsumerBuilder
                           <Ignore, string>(config).Build())
                {
                    consumerBuilder.Subscribe(Topic);
                    var cancelToken = new CancellationTokenSource();

                    try
                    {
                        while (true)
                        {
                            var consumer = consumerBuilder.Consume
                                (cancelToken.Token);

                            Console.WriteLine(consumer.Message);
                            var value = JObject.Parse(consumer.Message.Value);
                            
                            Console.WriteLine(value);
                            var eventType = value["event"]?.ToString();

                            if (eventType == "delete")
                            {
                                var author_id = value["user_id"]?.ToString();
                                
                                var postsToRemove = dbContext.posts.Where(x => x.Author_Id == author_id).ToList();

                                dbContext.posts.RemoveRange(postsToRemove);
                            }
                        }
                    }
                    catch (OperationCanceledException)
                    {
                        consumerBuilder.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
            }

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
