import { IUser } from '../../models/user';

export interface IUserService {
    createUser(name: string, email: string, country: string): Promise<IUser>;
}