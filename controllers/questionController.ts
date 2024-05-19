import { Questions } from "../models/models";
import { Request, Response, NextFunction } from 'express';

interface GetQuestions extends Request{
    userId: number;
    sectionId: number;
    limit?: number;
    page?: number;
}

class QuestionController {
  async create( req: Request, res: Response, next: NextFunction) {
    const { userId, sectionId, header, markers, is_vip } = req.body;
    const question = await Questions.create({userId, sectionId, header, markers, is_vip });
    return res.json(question);
  }

  async getAll(req: GetQuestions, res: Response, next: NextFunction) {
    let { userId, sectionId, limit, page } = req;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let questions;
    if (!userId && !sectionId) {
        questions = await Questions.findAndCountAll({limit, offset});
    }
    if (userId && !sectionId) {
        questions = await Questions.findAndCountAll({where: {userId}, limit, offset});
    }
    if (!userId && sectionId) {
        questions = await Questions.findAndCountAll({where: {sectionId}, limit, offset});
    }
    if (userId && sectionId) {
        questions = await Questions.findAndCountAll({where: {userId, sectionId}, limit, offset});
    }
    return res.json(questions);
  }
    async getOne( req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const question = await Questions.findOne({ where: { id } });
        return res.json(question);
    }
    async delete( req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const question = await Questions.destroy({ where: { id } });
        return res.json(question);
    }
}

module.exports = new QuestionController();