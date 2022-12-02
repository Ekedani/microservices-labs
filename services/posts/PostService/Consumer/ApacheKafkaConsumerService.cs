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
    public abstract class ApacheKafkaConsumerService : IHostedService, IDisposable
    {
        //private readonly AppDBContext dbContext;
        //private readonly IServiceScopeFactory scopeFactory;

        //public ApacheKafkaConsumerService(AppDBContext context)
        //{
        //    dbContext = context;
        //}
        private Task executingTask;
        private readonly CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
        protected abstract Task ExecuteAsync(CancellationToken stoppingToken);

        public virtual Task StartAsync(CancellationToken cancellationToken)
        {
            executingTask = ExecuteAsync(cancellationTokenSource.Token);

            if (executingTask.IsCompleted)
            {
                return executingTask;
            }

            return Task.CompletedTask;
            //await Task.Factory.StartNew(
            //    () =>
            //    {
            //        var config = new ConsumerConfig
            //        {
            //            BootstrapServers = bootstrapServers,
            //            AutoOffsetReset = AutoOffsetReset.Earliest,
            //            GroupId = "test"
            //        };
            //        try
            //        {
            //            using (var consumerBuilder = new ConsumerBuilder
            //                       <Ignore, string>(config).Build())
            //            {
            //                consumerBuilder.Subscribe(Topic);
            //                Console.WriteLine("Subscribed to the Topic");
            //                var cancelToken = new CancellationTokenSource();

            //                try
            //                {
            //                    while (true)
            //                    {
            //                        var consumer = consumerBuilder.Consume(cancelToken.Token);

            //                        Console.WriteLine(consumer.Message);
            //                        var value = JObject.Parse(consumer.Message.Value);

            //                        Console.WriteLine(value);
            //                        var eventType = value["event"]?.ToString();

            //                        if (eventType == "delete")
            //                        {
            //                            var author_id = value["user_id"]?.ToString();
            //                            using (var scope =
            //                                   scopeFactory
            //                                       .CreateScope()) // this will use `IServiceScopeFactory` internally
            //                            {
            //                                var context = scope.ServiceProvider.GetService<AppDBContext>();
            //                                var postsToRemove = context.posts.Where(x => x.Author_Id == author_id)
            //                                    .ToList();
            //                                context.posts.RemoveRange(postsToRemove);
            //                            }

            //                        }
            //                    }
            //                }
            //                catch (OperationCanceledException)
            //                {
            //                    Console.WriteLine("OperationCanceledException");
            //                    consumerBuilder.Close();
            //                }
            //                finally
            //                {
            //                    consumerBuilder.Close();
            //                }
            //            }
            //        }
            //        catch (Exception ex)
            //        {
            //            Console.WriteLine("Exception");
            //            System.Diagnostics.Debug.WriteLine(ex.Message);
            //        }

            //        return Task.CompletedTask;
            //    });
        }

        public virtual async Task StopAsync(CancellationToken cancellationToken)
        {
            if (executingTask == null)
            {
                return;
            }

            try
            {
                cancellationTokenSource.Cancel();
            }
            finally
            {
                await Task.WhenAny(executingTask, Task.Delay(Timeout.Infinite, cancellationToken));
            }
        }

        public void Dispose()
        {
            cancellationTokenSource.Cancel();
        }
    }
}
