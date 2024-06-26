import { v4 as uuidv4 } from "uuid";
import path from "path";
import ApiError from "../error/ApiError";
import { Users_Personal_info } from "../models/models";
import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";

class UserInfoController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, name, surname, age, faculty, group, course } = req.body;
      const { avatar } = req.files as { avatar: UploadedFile };
      const fileName = uuidv4() + ".jpg";
      avatar.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Users_Personal_info.create({
        userId,
        name,
        surname,
        age,
        faculty,
        group,
        course,
        avatar: fileName,
      });
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e as string));
    }
  }

  async getAll(res: Response) {
    const users_info = await Users_Personal_info.findAll();
    return res.json(users_info);
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user_info = await Users_Personal_info.findOne({ where: { id } });
      return res.json(user_info);
    } catch (e) {
      next(ApiError.badRequest(e as string));
    }
  }
  async getOneByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user_info = await Users_Personal_info.findOne({
        where: { userId },
      });
      return res.json(user_info);
    } catch (e) {
      next(ApiError.badRequest(e as string));
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user_info = await Users_Personal_info.destroy({ where: { id } });
    return res.json(user_info);
  }

  async update(req: Request, res: Response) {
    try {
      const { id, userId, name, surname, age, faculty, group, course } =
        req.body;

      let fileName;
      if (req.files !== null) {
        const { avatar } = req.files as { avatar: UploadedFile };
        fileName = uuidv4() + ".jpg";
        avatar.mv(path.resolve(__dirname, "..", "static", fileName));
      } else fileName = "default_avatar.jpg";

      const user_info = await Users_Personal_info.update(
        {
          userId,
          name,
          surname,
          age,
          faculty,
          group,
          course,
          avatar: fileName,
        },
        { where: { id } }
      );
      return res.json(user_info);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserInfoController();
