import "module-alias/register";

import express, { NextFunction, Request, Response } from "express";
import { createTopicModule } from "@modules/topic/modules";
import { APP_CONFIG, PORT, sequelize } from "@share/component";
import { responseErr } from "@share/controller/app-error";

(async function () {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");


  const app = express();

  app.use(express.json());

  app.use("/v1", createTopicModule(sequelize));

  app.get("/ping", (req: Request, res: Response) => {
    res.json({ message: "pong" });
  });

  const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    responseErr(err, res);
  };

  app.use(errorHandler);

  app.listen(APP_CONFIG.port, () => {
    console.log(`Server is running on port ${APP_CONFIG.port}`);
  });
})()



