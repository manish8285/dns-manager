import express from 'express';
import app from './app.js';
import { serverMode } from './config/config.js';
import dotenv from 'dotenv';
import mongodbConnection from './database/db.js';
dotenv.config();
const server = express();
server.use(app);
mongodbConnection()

const PORT = process.env.PORT || 8085;

server.listen(PORT, () => {
  process.stdout.write(`server is running on ${PORT} in ${serverMode} Mode \n`);
});
