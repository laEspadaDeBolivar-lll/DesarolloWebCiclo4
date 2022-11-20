import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import errorMiddleware from './middlewares/errors.js';
import authRouter from './routes/auths.routes.js';
import orderRouter from './routes/order.routes.js';
import productsRouter from './routes/products.routes.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' });


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());

app.use(express.json());

app.use('/api', productsRouter);
app.use('/api', authRouter);
app.use('/api', orderRouter);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}


// Error middleware
app.use(errorMiddleware);

export default app;
