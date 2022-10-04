import express from 'express';
import userRoutes from './routes/User.Route.js';
import createError from 'http-errors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('api/users', userRoutes);

// Custom 404 handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

// This error handler is ugly asf, but I'll fix it later
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
