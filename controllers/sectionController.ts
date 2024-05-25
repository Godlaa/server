import ApiError from '../error/ApiError';
import { Sections } from '../models/models';
import { Request, Response, NextFunction } from 'express';

class SectionController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
        const {name, discipline} = req.body;
        console.log(name, discipline);
        const section = await Sections.create({name, discipline});
        return res.json(section);
        }
        catch(e) {
            next(ApiError.badRequest(e as string));
        }
    }

    async getAll(req: Request, res: Response) {
        const sections = await Sections.findAll();
        return res.json(sections);
    }
    async getOne( req: Request, res: Response) {
        const {id} = req.params;
        const section = await Sections.findOne(
            {where: {id}}
        );
        return res.json(section);
    }
    async delete(req: Request, res: Response) {
        const {id} = req.params;
        const section = await Sections.destroy(
            {where: {id}}
        );
        return res.json(section);
    }
}

module.exports = new SectionController();