import { Router } from 'express';
import UserController from '../controllers/userController';
import UserService from '../services/userService';
import CountryService from '../services/countryService';
import userRepository from '../repositories/userRepository';
import localUserRepository from "../repositories/localUserRepository";

async function createRouter() {
    let repository;

    try {
        repository = await userRepository.create();
        console.log('Using MySQL repository');
    } catch (error) {
        console.error('Failed to connect to MySQL. Using in-memory repository.');
        repository = localUserRepository;
    }

    const countryService = new CountryService(repository);
    const userService = new UserService(countryService, repository);
    const userController = new UserController(userService);

    const router = Router();

    router.post('/', userController.registerUser);

    return router;
}

export default createRouter();