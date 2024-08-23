import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app: Application = express();

app.use(express.json()); 
app.use(morgan('dev')); 
app.use(helmet()); 
app.use(cors()); 

app.use('/api/users', userRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

export default app;