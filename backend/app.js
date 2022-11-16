import cookieParser from 'cookie-parser';
import express from 'express';
import errorMiddleware from './middlewares/errors.js';
import authRouter from './routes/auths.routes.js';
import orderRouter from './routes/order.routes.js';
import productsRouter from './routes/products.routes.js';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());

app.use(express.json());

app.use('/api', productsRouter);
app.use('/api', authRouter);
app.use('/api', orderRouter);

// Error middleware
app.use(errorMiddleware);

export default app;
