import { Request, Response, NextFunction } from 'express';
import { ICountryService } from '../interfaces/IServices/ICountryService';

class CountryController {
    private countryService: ICountryService;

    constructor(countryService: ICountryService) {
        this.countryService = countryService;
    }

    public getTopFavoriteCountries = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const topCountries = await this.countryService.getTopFavoriteCountries();
            res.status(200).json(topCountries);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    };
}

export default CountryController;