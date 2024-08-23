import express, { Application } from 'express';
import countryRoutes from './routes/countryRoutes'; 

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/countries', countryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});