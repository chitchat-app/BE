import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import client from './config/redis';
import connectDB from './config/db';

import authRouter from "./router/auth";

const PORT = 4001;
mongoose.set('strictQuery', false);
client;
connectDB();
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('I love you all ❤️');
});
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log('love u');
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
