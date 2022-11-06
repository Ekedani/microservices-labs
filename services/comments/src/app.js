import express from 'express';
import commentRouter from './routes/Comment.Router.js';
import createError from 'http-errors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', commentRouter);

app.use((req, res, next) => {
    next(createError(404, 'Route not found'));
});

app.use((err, req, res, next) => {
    const errors = [];
    if (!Array.isArray(err)) {
        errors.push({
            status: err.status || 500,
            message: err.message || 'An error occured'
        });
    } else {
        err.forEach((x) => {
            errors.push({
                status: x.status || 500,
                message: x.message || 'An error occured'
            });
        });
    }
    res.status(errors[0].status || 500);
    res.send({ errors });
});

export default app;