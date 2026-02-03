import express from 'express';
import cors from 'cors';

import authRouter from './routes/authRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
const app = express();
app.use(cors({
    origin: process.env.URL_CLIENT || 'http://localhost:5173',
    credentials: true
}));

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.listen(port, () => {
    console.log(`Server berjalan di port ${4000}`);
})