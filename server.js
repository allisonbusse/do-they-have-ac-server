import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import locationRoutes from './routes/locations.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "40mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));
app.use(cors());
app.use('/locations', locationRoutes);

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
