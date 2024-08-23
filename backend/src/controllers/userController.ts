import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../interfaces/IServices/IUserService';
import userService from '../services/userService';

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
            next(error);
        }
    };
}

const userController = new UserController(userService);

export default userController;