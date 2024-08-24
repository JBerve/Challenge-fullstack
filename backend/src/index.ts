import dotenv from 'dotenv';
import app from './app';
import CountryService from "./services/countryService";
import UserRepository from "./repositories/userRepository";
import UserService from "./services/userService";
import UserController from "./controllers/userController";
import CountryController from "./controllers/countryController";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
