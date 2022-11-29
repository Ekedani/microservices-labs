import {Consumer} from "kafka-node";

export default class EmailConsumer {
    constructor(kafkaClient, transport, options) {
        this.kafkaConsumer = new Consumer(kafkaClient, [{topic: options.topic}]);
        this.transport = transport;
        this.eventHandlers = [];

        this.kafkaConsumer.on('message', async (message) => {
            try {
                console.log(message);
                const handler = this.eventHandlers.find(handler => handler.event === message.value.event);
                if(!handler) {
                    throw new Error('Unimplemented error');
                }
                const data = await handler(message.value.comment);
                const info = await this.transport.sendMail(data);
                console.log('Message sent: ', info.messageId);
            } catch (err) {
                console.log('Error: ', err);
            }
        });

        this.kafkaConsumer.on('error', (err) => {
            console.log('Email consumer error: ', err);
        })
    }

   addEventHandler(event, handler) {
    this.eventHandlers.push({event, handler});
   }
}
