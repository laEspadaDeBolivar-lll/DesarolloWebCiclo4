import express from 'express';

const app = express();

app.use(express.json()); // para poder utilizar o recibir json 
// app.use("/api");

export default app;
