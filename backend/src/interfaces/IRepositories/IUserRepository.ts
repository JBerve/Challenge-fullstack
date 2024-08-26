import { IUser } from '../../models/user';

export interface IUserRepository {
    addUser(user: IUser): Promise<void>;
    findUserByEmail(email: string): Promise<IUser | undefined>;
    getAllUsers(): Promise<IUser[]>;
}