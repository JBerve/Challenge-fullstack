import { IUserRepository } from '../interfaces/IRepositories/IUserRepository';
import { IUser } from '../models/user';

class UserRepository implements IUserRepository {
    private static instance: UserRepository;
    private users: IUser[] = [];

    private constructor() {}

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    async addUser(user: IUser): Promise<void> {
        this.users.push(user);
    }

    async findUserByEmail(email: string): Promise<IUser | undefined> {
        return this.users.find(user => user.email === email);
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.users;
    }
}

export default UserRepository.getInstance();