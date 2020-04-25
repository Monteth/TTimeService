import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose'
import config from 'config'
import auth from './Middleware/Auth'

import indexRouter from './routes';
import authController from './routes/authController';
import tasksRouter from './routes/taskController';

const uri = "mongodb+srv://TTimeUser:ZAvM4ZHzzXF02ZQZ@cluster0-jhmtv.mongodb.net/TTime?retryWrites=true&w=majority";

if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

const app = express();

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connnection successful!'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authController);
app.use('/tasks', auth, tasksRouter);




export default app;
