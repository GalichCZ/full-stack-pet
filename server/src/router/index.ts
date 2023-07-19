import { Router } from "express";
import { userRouter } from "./User.js";

export const routers: Router[] = [userRouter];
