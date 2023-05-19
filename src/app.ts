import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import connectDB from './config/db';

const PORT = 4000;
mongoose.set('strictQuery', false);
connectDB();

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('I love you all ❤️');
});

app.listen(PORT, () => {
  console.log('love u');
  return console.log(`Express is listening at http://localhost:${PORT}`);
});