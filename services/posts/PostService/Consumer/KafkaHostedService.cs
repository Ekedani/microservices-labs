using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using PostService.Data;

namespace PostService.Consumer
{
    public class KafkaHostedService : ApacheKafkaConsumerService
    {
        private readonly ILogger<KafkaHostedService> logger;
        private readonly IConfiguration configuration;
        private readonly IServiceScopeFactory scopeFactory;

        private readonly string Topic = "users";
        private readonly string bootstrapServers = $"{Environment.GetEnvironmentVariable("KAFKA_HOST")}:9092";


        public KafkaHostedService(
            ILogger<KafkaHostedService> logger,
            IConfiguration configuration,
            IServiceScopeFactory scopeFactory)
        {
            this.logger = logger;
            this.configuration = configuration;
            this.scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            logger.LogInformation($"Kafka background task is starting.");

            cancellationToken.Register(() =>
                logger.LogInformation($" Kafka background task is stopping."));

            await Task.Run(async () =>
            {
                while (true)
                {
                    logger.LogInformation($"Kafka task is doing the work.");
                    
                    var consumerConfig = new ConsumerConfig
                    {
                        BootstrapServers = bootstrapServers,
                        AutoOffsetReset = AutoOffsetReset.Earliest,
                        GroupId = "test"
                    };

                    var cb = new ConsumerBuilder<string, string>(consumerConfig);
                    logger.LogInformation($"Consumer builder had been built");

                    using (var consumer = cb.Build())
                    {
                        consumer.Subscribe(Topic);
                        logger.LogInformation($"Consumer subscribed on topic: {Topic}");
                        while (true)
                        {
                            var cr = consumer.Consume(cancellationToken);

                            logger.LogInformation($"Consumer Got Message: {cr.Message}");
                            var value = JObject.Parse(cr.Message.Value);

                            Console.WriteLine(value);
                            var eventType = value["event"]?.ToString();
                            logger.LogInformation($"Event in Message: {eventType}");

                            if (eventType == "delete")
                            {
                                var author_id = value["user_id"]?.ToString();
                                logger.LogInformation($"Author_id in Message: {author_id}");
                                using (var scope = scopeFactory.CreateScope())
                                {
                                    var context = scope.ServiceProvider.GetService<AppDBContext>();
                                    if (context == null)
                                    {
                                        logger.LogInformation($"Context is null");
                                    }
                                    else
                                    {

                                        var postsToRemove = context.posts.Where(x => x.Author_Id == author_id)
                                            .ToList();
                                        foreach (var item in postsToRemove)
                                        {
                                            context.posts.Remove(item);
                                        }
                                        context.SaveChanges();

                                        logger.LogInformation($"Posts has been removed");
                                    }
                                }

                            }
                            else
                            {
                                logger.LogInformation($"Event in Message is not delete");
                            }
                        }
                    }
                }
            });
        }
    }
}
