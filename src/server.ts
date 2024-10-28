import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import  AppDataSource  from './configs/db';
import router from './routes/routes';
dotenv.config();
import cors from 'cors';
const app = express();
app.use(cors());
const PORT = process.env.PORT;
AppDataSource
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api',router);
app.listen(PORT, () => {
    console.log(`Server is runing on http://localhost:${PORT}`);
})
