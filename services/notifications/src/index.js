import 'dotenv/config.js';
import {KafkaClient} from 'kafka-node';
import {createTransport} from 'nodemailer';
import EmailConsumer from './consumers/emailConsumer.js';
import newCommentHandler from './handlers/newCommentHandler.js';

const kafkaClient = new KafkaClient({
    kafkaHost: `${process.env.KAFKA_HOST}:9092`
});

const emailTransporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const сommentConsumer = new EmailConsumer(kafkaClient, emailTransporter, {
    topic: 'post.comment'
});

сommentConsumer.addEventHandler('add', newCommentHandler);
