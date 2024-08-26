import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../interfaces/IServices/IUserService';

class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    public registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, country } = req.body;
            const user = await this.userService.createUser(name, email, country);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'This email has already voted.') {
                    res.status(400).json({ message: error.message });
                } else {
                    res.status(400).json({ message: error.message });
                }
            } else {
                res.status(500).json({ message: 'An internal error occurred' });
            }
        }
    };
}

export default UserController;