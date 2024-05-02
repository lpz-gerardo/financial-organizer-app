import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from '../server/routes/authRoutes.js';
import memberRoutes from '../server/routes/memberRoutes.js';
import accountRoutes from '../server/routes/accountRoutes.js';
const { MONGODB_URL, PORT } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/user', authRoutes);
app.use('/member', memberRoutes);
app.use('/account', accountRoutes);

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('App connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App listening on port: ${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
    });
