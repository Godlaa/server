import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        email: string;
        role: string;
    };
}

export interface User {
    id: number;
    email: string;
    role: string;
}

module.exports = function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "Не авторизован"});
        }
        const decoded : User = jwt.verify(token, process.env.SECRET_KEY!) as User;
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({message: "Не авторизован"});
    }
}