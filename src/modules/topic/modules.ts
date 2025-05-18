import { TopicInmemoryRepository } from "./infras/repository";
import { CreateTopicCommandHandler, ListTopicsQueryHandler, UpdateTopicCommandHandler } from "./service";
import { TopicHTTPController } from "./infras/controller";
import { Router } from "express";
import { TopicSequelizeRepository } from "./infras/repository/sequelize-repo";
import { initSequelizeModel } from "./infras/repository";
import { Sequelize } from "sequelize";
import { DeleteTopicCommandHandler } from "./service/delete-topic.cmd";
import { GetTopicByIdQueryHandler } from "./service/get-topic-by-id.query";

export function createTopicModule(seq: Sequelize): Router {
  initSequelizeModel(seq);

  // const repository = new TopicInmemoryRepository();
  const repository = new TopicSequelizeRepository();

  const getTopicByIdQueryHandler = new GetTopicByIdQueryHandler(repository);
  const listTopicsQueryHandler = new ListTopicsQueryHandler(repository);
  const createTopicCommandHandler = new CreateTopicCommandHandler(repository, repository);
  const updateTopicCommandHandler = new UpdateTopicCommandHandler(repository, repository);
  const deleteTopicCommandHandler = new DeleteTopicCommandHandler(repository, repository);


  const controller = new TopicHTTPController(
    createTopicCommandHandler,
    getTopicByIdQueryHandler,
    listTopicsQueryHandler,
    updateTopicCommandHandler,
    deleteTopicCommandHandler,
  );

  return controller.getRoutes();
}