import { IUser } from '../../models/user';

export interface IUserRepository {
    addUser(user: IUser): void;
    findUserByEmail(email: string): IUser | undefined;
    getAllUsers(): IUser[];
}