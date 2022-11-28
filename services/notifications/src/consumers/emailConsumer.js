import {Consumer} from "kafka-node";

export default class EmailConsumer {
    constructor(kafkaClient, transport, options) {
        this.kafkaConsumer = new Consumer(kafkaClient, [
            {topic: options.topic, partition: options.partition}
        ], {autoCommit: false});
        this.transport = transport;
    }

   addEventHandler(event, handler){
    this.kafkaConsumer.on(event, async (message) => {
        try {
            const data = await handler(message);
            const info = await this.transport.sendMail(data);
            console.log('Message sent: ', info.messageId);
        } catch (err) {
            console.log('Error: ', err);
        }
    });
   }

}
