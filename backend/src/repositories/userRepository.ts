import { IUserRepository } from '../interfaces/IRepositories/IUserRepository';
import { IUser } from '../models/user';

class UserRepository implements IUserRepository {
    private users: IUser[] = [];

    addUser(user: IUser): void {
        this.users.push(user);
    }

    findUserByEmail(email: string): IUser | undefined {
        return this.users.find(user => user.email === email);
    }

    getAllUsers(): IUser[] {
        return this.users;
    }
}

export default new UserRepository();