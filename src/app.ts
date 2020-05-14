import express from 'express';
import path from 'path';
import morgan from 'morgan';
import indexRoutes from './routes/index';

const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', indexRoutes);

//Folder to store images
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;