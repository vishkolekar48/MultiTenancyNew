 import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import router from './routes/userRoutes.js';
dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});