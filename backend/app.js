import cookieParser from 'cookie-parser';
import express from 'express';
import errorMiddleware from './middlewares/errors.js';
import authRouter from './routes/auths.routes.js';
import orderRouter from './routes/order.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use('/api', productsRouter);
app.use('/api', authRouter);
app.use('/api', orderRouter);

// Error middleware
app.use(errorMiddleware);

export default app;
