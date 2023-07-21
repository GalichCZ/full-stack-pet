import express, { Router, Response, Request } from "express";
import UserController from "../controllers/User.controller";
import { body } from "express-validator";

export const userRouter: Router = express.Router();

userRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);

userRouter.post("/login", UserController.login);
