const uuid = require('uuid');
const path = require('path');
import ApiError from '../error/ApiError';
import { Users_Personal_info } from '../models/models';
import { Request, Response, NextFunction } from 'express';

class UserInfoController{
    async create(req: Request, res: Response, next: NextFunction) {
        try {  
            const {userId, name, surname, age, faculty, group, course} = req.body;
            const {avatar} = req.files as {avatar: any};
            let fileName = uuid.v4() + ".jpg";
            avatar.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Users_Personal_info.create({userId, name, surname, age, faculty, group, course, avatar: fileName});
            return res.json(device);
        }
        catch(e) {
            next(ApiError.badRequest(e as string));
        }
      }
      
    async getAll(req: Request, res: Response) {
        const users_info = await Users_Personal_info.findAll();
        return res.json(users_info);
    }
    async getOne(req: Request, res: Response) {
        const {id} = req.params;
        const user_info = await Users_Personal_info.findOne(
            {where: {id}}
        );
        return res.json(user_info);
    }
    async delete(req: Request, res: Response) {
        const {id} = req.params;
        const user_info = await Users_Personal_info.destroy(
            {where: {id}}
        );
        return res.json(user_info);
    }
}

module.exports = new UserInfoController();