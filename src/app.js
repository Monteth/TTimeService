import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose'
import config from 'config'
import auth from './Middleware/Auth'

import indexRouter from './routes';
import authController from './routes/authController';
import tasksRouter from './routes/taskController';
import timeRecordController from "./routes/timeRecordController";

const uriTemplate = "mongodb+srv://TTimeUser:<password>@cluster0-jhmtv.mongodb.net/TTime?retryWrites=true&w=majority";

if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

const uri = uriTemplate.replace("<password>", config.get("mongodbpass"))

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
app.use('/timeRecords', auth, timeRecordController)




export default app;
