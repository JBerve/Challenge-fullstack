import { Router } from 'express';
import UserController from '../controllers/userController';
import UserService from '../services/userService';
import CountryService from '../services/countryService';
import userRepository from '../repositories/userRepository';

const countryService = new CountryService(userRepository);
const userService = new UserService(countryService, userRepository);
const userController = new UserController(userService);

const router = Router();

router.post('/', userController.registerUser);

export default router;