import express from 'express';
import productsRouter from './routes/products.routes.js';

const app = express();

app.use(express.json()); // para poder utilizar o recibir json 
app.use("/api", productsRouter); // para poder utilizar el router
export default app;
