import { Router } from 'express';
import CountryController from '../controllers/countryController';
import CountryService from '../services/countryService';
import userRepository from '../repositories/userRepository';

const countryService = new CountryService(userRepository);
const countryController = new CountryController(countryService);

const router = Router();

router.get('/', countryController.getTopFavoriteCountries);

export default router;