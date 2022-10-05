import express from 'express';
import commentRouter from './routes/Comment.Router.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/comments', commentRouter);
