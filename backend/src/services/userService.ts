import { IUserService } from '../interfaces/IServices/IUserService';
import { IUser } from '../models/user';
import { ICountryService } from '../interfaces/IServices/ICountryService';
import { IUserRepository } from '../interfaces/IRepositories/IUserRepository';

class UserService implements IUserService {
    private countryService: ICountryService;
    private userRepository: IUserRepository;

    constructor(countryService: ICountryService, userRepository: IUserRepository) {
        this.countryService = countryService;
        this.userRepository = userRepository;
    }

    async createUser(name: string, email: string, country: string): Promise<IUser> {
        const existingUser = await this.userRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('This email has already voted.');
        }
        
        const countryDetails = await this.countryService.getCountryDetails(country);
        const newUser: IUser = { name, email, favoriteCountry: countryDetails.name };
        await this.userRepository.addUser(newUser);

        return newUser;
    }
}

export default UserService;
