import { IUserService } from '../interfaces/IServices/IUserService';
import { IUser } from '../models/user';
import userRepository from '../repositories/userRepository';

class UserService implements IUserService {
    async createUser(name: string, email: string, country: string): Promise<IUser> {
        const existingUser = userRepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('This email has already voted.');
        }

        //const countryDetails = await getCountryDetails(country);
        const countryDetails = "";
        const newUser: IUser = { name, email, favoriteCountry: countryDetails };
        userRepository.addUser(newUser);

        return newUser;
    }
}

export default new UserService();