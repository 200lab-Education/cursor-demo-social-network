import { AppError, ErrInvalidRequest, ErrNotFound } from "@share/controller";
import { DeleteTopicCommand, IDeleteTopicCommandHandler, IDeleteTopicCommandRepository, IGetTopicQueryRepository } from "../interfaces";
import { TopicStatus } from "../model";
import { ERR_TOPIC_ALREADY_DELETED, ERR_TOPIC_NOT_FOUND } from "../model/error";

export class DeleteTopicCommandHandler implements IDeleteTopicCommandHandler {
  constructor(
    private readonly queryRepo: IGetTopicQueryRepository,
    private readonly commandRepo: IDeleteTopicCommandRepository,
  ) {}

  async execute(command: DeleteTopicCommand): Promise<void> {
    const topic = await this.queryRepo.getById(command.id);
    if (!topic) {
      throw ErrNotFound.withMessage(ERR_TOPIC_NOT_FOUND.message).withLog(`Topic ${command.id} not found`);
    }

    if (topic.status === TopicStatus.DELETED) throw ErrNotFound.withMessage(ERR_TOPIC_ALREADY_DELETED.message);

    await this.commandRepo.delete(command.id, command.isHard);
  }
}