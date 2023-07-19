import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { routers } from "./router/index";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

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
  } catch (error) {
    console.error(error);
  }
};

start();
