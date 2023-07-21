import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { routers } from "./router/index";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

routers.forEach((router) => {
  app.use("/api", router);
});

app.get("/api", (req: Request, res: Response) => {
  res.send("Express + TS Server");
});

const start = async () => {
  try {
    await app.listen(PORT, () => {
      console.log("server started on", PORT);
    });
    await mongoose.connect(MONGO_URL || "").then(() => {
      console.log("DB IS OK");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
