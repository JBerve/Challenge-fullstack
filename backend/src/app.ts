import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import createUserRouter from './routers/userRouter';
import createCountryRouter from "./routers/countryRouter";

async function createApp(): Promise<Application> {
    const app: Application = express();

    app.use(express.json());
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors());

    const userRouter = await createUserRouter;
    const countryRouter = await createCountryRouter;
    
    app.use('/api/users', userRouter);
    app.use('/api/countries', countryRouter);
    
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    });

    return app;
}

export default createApp;