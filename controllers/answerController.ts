import ApiError from "../error/ApiError";
import { Answers } from "../models/models";
import { Request, Response, NextFunction } from "express";

class AnswerController {
  async create(req: Request, res: Response) {
    const { questionId, userId, text, likes } = req.body;
    const answer = await Answers.create({ questionId, userId, text, likes });
    return res.json(answer);
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    const { questionId, userId } = req.query;
    let answers;
    try {
      if (!userId && !questionId) {
        answers = await Answers.findAll();
      }
      if (userId && !questionId) {
        answers = await Answers.findAll({ where: { userId } });
      }
      if (!userId && questionId) {
        answers = await Answers.findAll({ where: { questionId } });
      }
      if (userId && questionId) {
        answers = await Answers.findAll({ where: { userId, questionId } });
      }
      return res.json(answers);
    } catch (e) {
      next(ApiError.badRequest(e as string));
    }
  }
  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const answer = await Answers.findOne({ where: { id } });
    return res.json(answer);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const answer = await Answers.destroy({ where: { id } });
    return res.json(answer);
  }
}

module.exports = new AnswerController();
