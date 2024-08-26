import mysql from 'mysql2/promise';
import { IUserRepository } from '../interfaces/IRepositories/IUserRepository';
import { IUser } from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

class userRepository implements IUserRepository {
    private connection: mysql.Connection;

    private constructor(connection: mysql.Connection) {
        this.connection = connection;
    }
    
    public static async create(): Promise<userRepository> {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'country_vote',
        });
        return new userRepository(connection);
    }

    public async addUser(user: IUser): Promise<void> {
        const query = 'INSERT INTO users (name, email, favorite_country) VALUES (?, ?, ?)';
        const values = [user.name, user.email, user.favoriteCountry];
        await this.connection.execute(query, values);
    }

    public async findUserByEmail(email: string): Promise<IUser | undefined> {
        const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        const [rows] = await this.connection.execute(query, [email]);
        const results = rows as mysql.RowDataPacket[];

        if (results.length === 0) {
            return undefined;
        }

        const user = results[0];
        return {
            name: user.name,
            email: user.email,
            favoriteCountry: user.favorite_country,
        };
    }

    public async getAllUsers(): Promise<IUser[]> {
        const query = 'SELECT * FROM users';
        const [rows] = await this.connection.execute(query);
        const results = rows as mysql.RowDataPacket[];

        return results.map(user => ({
            name: user.name,
            email: user.email,
            favoriteCountry: user.favorite_country,
        }));
    }
}

export default userRepository;