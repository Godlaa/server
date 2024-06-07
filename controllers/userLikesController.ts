import ApiError from '../error/ApiError';
import { User_likes } from '../models/models';
import { Request, Response, NextFunction } from 'express';

class UserLikesController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, answerId, is_liked } = req.body;

            const like = await User_likes.findOne({where: {userId, answerId}});
            if (like) {
                await User_likes.destroy({where: {userId, answerId}});
                return res.json(like);
            }

            const userLike = await User_likes.create({userId, answerId, is_liked});
            return res.json(userLike);
        }
        catch(e) {
            next(ApiError.badRequest(e as string));
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const { userId, answerId } = req.query;
        let answers;
        try {
            if (!userId && !answerId) {
                answers = await User_likes.findAll();
            }
            if (userId && !answerId) {
                answers = await User_likes.findAll({where: {userId}});
            }
            if (!userId && answerId) {
                answers = await User_likes.findAll({where: {answerId}});
            }
            if (userId && answerId) {
                answers = await User_likes.findAll({where: {userId, answerId}});
            }
            return res.json(answers);
        }
        catch (e) {
            next(ApiError.badRequest(e as string));
        }
    }
    async getOne(req: Request, res: Response) {
        const {id} = req.params;
        const userLike = await User_likes.findOne(
            {where: {id}}
        );
        return res.json(userLike);
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        const userLike = await User_likes.destroy(
            {where: {id}}
        );
        return res.json(userLike);
    }
}

module.exports = new UserLikesController();