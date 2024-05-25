import ApiError from '../error/ApiError';
import { Users } from '../models/models';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        email: string;
        role: string;
    };
}

const generateJwt = (id: any, email: any, role: any) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}

class UserController{
    async registration(req: Request, res: Response, next: NextFunction){
        const {email, password, role} = req.body;
        if(!email || !password){
            return next(ApiError.badRequest('incorrect email or password'));
        }
        const candidate = await Users.findOne({where: {email}});
        if(candidate){
            return next(ApiError.badRequest('user with this email already exists'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await Users.create({email, role, password: hashPassword});
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }
    async login(req: Request, res: Response, next: NextFunction){
        const {email, password} = req.body;
        const user = await Users.findOne({where: {email}});
        if(!user){
            return next(ApiError.internal('user not found'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return next(ApiError.internal('incorrect password'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }
    async check(req: AuthenticatedRequest, res: Response, next: NextFunction){
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({token});
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        const users = await Users.findAll(); 
        return res.json(users);
    }
    async getOne(req: Request, res: Response, next: NextFunction){
        const {id} = req.params;
        const user
        = await Users.findOne({
            where: {id}
        });
        return res.json(user);
    }
}

module.exports = new UserController();