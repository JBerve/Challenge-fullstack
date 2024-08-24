import axios from 'axios';
import { ICountryService } from '../interfaces/IServices/ICountryService';
import { ICountry } from '../models/country';
import { IUserRepository } from '../interfaces/IRepositories/IUserRepository';
import { IUser } from '../models/user';

class CountryService implements ICountryService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getCountryDetails(countryName: string): Promise<ICountry> {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
            const countryData = response.data[0];
            return {
                name: countryData.name.common,
                officialName: countryData.name.official,
                capital: countryData.capital ? countryData.capital[0] : 'N/A',
                region: countryData.region,
                subregion: countryData.subregion,
            };
        } catch (error) {
            throw new Error(`Country details for "${countryName}" could not be fetched.`);
        }
    }

    private countCountryVotes(users: IUser[]): { [key: string]: number } {
        return users.reduce((acc, user) => {
            acc[user.favoriteCountry] = (acc[user.favoriteCountry] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
    }

    async getTopFavoriteCountries(): Promise<ICountry[]> {
        const users = await this.userRepository.getAllUsers();
        console.log(users);
        const countryVotes = this.countCountryVotes(users);
        console.log(countryVotes);

        const topCountries = Object.entries(countryVotes)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([countryName]) => this.getCountryDetails(countryName));

        return Promise.all(topCountries);
    }
}

export default CountryService;