import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'

const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser())
app.use(authRoutes);
app.use(taskRoutes);

export default app;