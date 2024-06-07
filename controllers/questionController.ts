import { Questions } from "../models/models";
import { Request, Response } from 'express';

class QuestionController {
  async create( req: Request, res: Response) {
    const { userId, sectionId, header, markers, is_vip } = req.body;
    const question = await Questions.create({userId, sectionId, header, markers, is_vip });
    return res.json(question);
  }

  async getAll(req: Request, res: Response) {
    const { userId, sectionId, limit, page } = req.query;
    const page_c = page ? parseInt(page as string) : 1;
    const limit_c = limit ? parseInt(limit as string) : 9;
    const offset = page_c * limit_c - limit_c;
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
    async getOne( req: Request, res: Response) {
        const { id } = req.params;
        const question = await Questions.findOne({ where: { id } });
        return res.json(question);
    }
    async delete( req: Request, res: Response) {
        const { id } = req.params;
        const question = await Questions.destroy({ where: { id } });
        return res.json(question);
    }
}

module.exports = new QuestionController();