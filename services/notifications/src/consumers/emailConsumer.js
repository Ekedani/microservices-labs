import {Consumer} from "kafka-node";

export default class EmailConsumer {
    constructor(kafkaClient, transport, options) {
        this.kafkaConsumer = new Consumer(kafkaClient, [
            {topic: options.topic, partition: 0}
        ], {autoCommit: false});

        this.kafkaConsumer.on('message', async (message) => {
            try {
                const data = await options.handler(message);
                const info = await transport.sendMail(data);
                console.log('Message sent: ', info.messageId);
            } catch (err) {
                console.log('Error: ', err);
            }
        });
    }
}
