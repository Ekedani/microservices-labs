import {Consumer} from "kafka-node";

export default class EmailConsumer {
    constructor(kafkaClient, transport, options) {
        this.kafkaConsumer = new Consumer(kafkaClient, [{topic: options.topic}]);
        this.transport = transport;
        thid.eventHandlers = [];

        this.kafkaConsumer.on('message', async (message) => {
            try {
                message = JSON.parse(message);
                const handler = this.eventHandlers.find(handler => handler.event === message.messages.event);
                if(!handler) {
                    throw new Error('Unimplemented error');
                }
                const data = await handler(message.messages.comment);
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
