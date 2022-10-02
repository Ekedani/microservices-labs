import express from 'express';
import createError from 'http-errors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
