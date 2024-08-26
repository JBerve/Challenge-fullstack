import { IUserRepository } from '../interfaces/IRepositories/IUserRepository';
import { IUser } from '../models/user';

class localUserRepository implements IUserRepository {
    private static instance: localUserRepository;
    private users: IUser[] = [];

    private constructor() {}

    public static getInstance(): localUserRepository {
        if (!localUserRepository.instance) {
            localUserRepository.instance = new localUserRepository();
        }
        return localUserRepository.instance;
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

export default localUserRepository.getInstance();