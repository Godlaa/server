import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, User } from './authMiddleware';
import jwt from 'jsonwebtoken';

module.exports = function(role: string) {
    return function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({message: "Не авторизован"});
            }
            console.log(process.env.SECRET_KEY);
            const decoded : User = jwt.verify(token, process.env.SECRET_KEY!) as User;
            if (decoded.role !== role) {
                return res.status(403).json({message: "У вас нет доступа"});
            }
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({message: "Не авторизован"});
        }
    }
}


