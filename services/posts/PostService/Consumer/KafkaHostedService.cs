using Confluent.Kafka;
using Newtonsoft.Json;
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

                    using (var consumer = cb.Build())
                    {
                        consumer.Subscribe(Topic);

                        var cr = consumer.Consume(cancellationToken);

                        Console.WriteLine(cr.Message);
                        var value = JObject.Parse(cr.Message.Value);

                        Console.WriteLine(value);
                        var eventType = value["event"]?.ToString();

                        if (eventType == "delete")
                        {
                            var author_id = value["user_id"]?.ToString();
                            using (var scope = scopeFactory.CreateScope())
                            {
                                var context = scope.ServiceProvider.GetService<AppDBContext>();
                                var postsToRemove = context.posts.Where(x => x.Author_Id == author_id)
                                    .ToList();
                                context.posts.RemoveRange(postsToRemove);
                            }

                        }
                    }
                }
            });
        }
    }
}
