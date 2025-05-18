import { AppError, ErrInternalServer, ErrNotFound } from "@share/controller";
import { IGetTopicQueryHandler, GetTopicQuery } from "../interfaces";
import { IGetTopicQueryRepository } from "../interfaces";
import { Topic } from "../model";
import { ERR_TOPIC_NOT_FOUND } from "../model/error";

export class GetTopicByIdQueryHandler implements IGetTopicQueryHandler {
  constructor(private readonly queryRepo: IGetTopicQueryRepository) {}

  async execute(query: GetTopicQuery): Promise<Topic | null> {
    try {
      const topic = await this.queryRepo.getById(query.id);

      if (!topic) throw ErrNotFound.withMessage(ERR_TOPIC_NOT_FOUND.message).withLog(`Topic ${query.id} not found`);
      return topic;
    } catch (err) {
      if (err instanceof AppError) throw err;

      throw ErrInternalServer.wrap(err).withLog(err.message);
    }
  }
}