import dotenv from 'dotenv';
import createApp from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

createApp().then(app => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
}).catch(error => {
    console.error('Failed to start server:', error);
});