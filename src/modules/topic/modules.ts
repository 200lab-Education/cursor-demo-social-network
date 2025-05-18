import { TopicInmemoryRepository } from "./infras/repository";
import { TopicService } from "./service";
import { TopicHTTPController } from "./infras/controller";
import { Router } from "express";
import { TopicSequelizeRepository } from "./infras/repository/sequelize-repo";
import { initSequelizeModel } from "./infras/repository";
import { sequelize } from "@share/component";
import { Sequelize } from "sequelize";

export function createTopicModule(seq: Sequelize): Router {
  initSequelizeModel(sequelize);

  // const repository = new TopicInmemoryRepository();
  const repository = new TopicSequelizeRepository();
  const service = new TopicService(repository);
  const controller = new TopicHTTPController(service);
  return controller.getRoutes();
}