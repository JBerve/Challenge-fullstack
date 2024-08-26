import { Router } from 'express';
import CountryController from '../controllers/countryController';
import CountryService from '../services/countryService';
import userRepository from '../repositories/userRepository';
import localUserRepository from '../repositories/localUserRepository';

async function createRouter() {
    let repository;

    try {
        repository = await userRepository.create();
    } catch (error) {
        repository = localUserRepository;
    }

    const countryService = new CountryService(repository);
    const countryController = new CountryController(countryService);

    const router = Router();

    router.get('/', countryController.getTopFavoriteCountries);

    return router;
}

export default createRouter();