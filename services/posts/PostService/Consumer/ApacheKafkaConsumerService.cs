using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confluent.Kafka;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using PostService.Data;

namespace PostService.Consumer
{
    public class ApacheKafkaConsumerService : IHostedService
    {
        //private readonly AppDBContext dbContext;
        private readonly IServiceScopeFactory scopeFactory;

        private readonly string Topic = "users";
        //private readonly string groupId = "test";
        private readonly string bootstrapServers = $"{Environment.GetEnvironmentVariable("KAFKA_HOST")}:9092";

        //public ApacheKafkaConsumerService(AppDBContext context)
        //{
        //    dbContext = context;
        //}

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await Task.Factory.StartNew(
                () =>
                {
                    while (!cancellationToken.IsCancellationRequested)
                    {
                        var config = new ConsumerConfig
                        {
                            BootstrapServers = bootstrapServers,
                            AutoOffsetReset = AutoOffsetReset.Earliest,
                            GroupId = "test"
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
                                        var consumer = consumerBuilder.Consume(cancelToken.Token);

                                        Console.WriteLine(consumer.Message);
                                        var value = JObject.Parse(consumer.Message.Value);

                                        Console.WriteLine(value);
                                        var eventType = value["event"]?.ToString();

                                        if (eventType == "delete")
                                        {
                                            var author_id = value["user_id"]?.ToString();
                                            using (var scope =
                                                   scopeFactory
                                                       .CreateScope()) // this will use `IServiceScopeFactory` internally
                                            {
                                                var context = scope.ServiceProvider.GetService<AppDBContext>();
                                                var postsToRemove = context.posts.Where(x => x.Author_Id == author_id)
                                                    .ToList();
                                                context.posts.RemoveRange(postsToRemove);
                                            }

                                        }
                                    }
                                }
                                catch (OperationCanceledException)
                                {
                                    consumerBuilder.Close();
                                }
                                finally
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
                    return Task.CompletedTask;
                });
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
