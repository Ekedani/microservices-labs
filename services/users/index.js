import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();
const APP_PORT = process.env.PORT ?? 3000;

app.listen(APP_PORT, () => {
    console.log(`Now serving your express app at http://localhost:${APP_PORT}`);
});