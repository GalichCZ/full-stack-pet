import { Request, Response, NextFunction } from "express";
import UserService from "../services/User.service";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api.error";

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Validation error, check all poles please",
            errors.array()
          )
        );
      }

      const userData = await UserService.registration(req.body);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { nickname, password } = req.body;
      const userData = await UserService.login(nickname, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
