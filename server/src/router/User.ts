import express, { Router, Response, Request } from "express";

export const userRouter: Router = express.Router();

userRouter.post("/registration", (req: Request, res: Response) => {
  res.json({ message: "registered" });
});

userRouter.get("/login", (req: Request, res: Response) => {});
