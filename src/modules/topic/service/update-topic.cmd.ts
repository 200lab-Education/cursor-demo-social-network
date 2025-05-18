import { UpdateTopicSchema, IGetTopicQueryRepository, IUpdateTopicCommandRepository } from "../interfaces";
import { ERR_TOPIC_NAME_ALREADY_EXISTS, ERR_TOPIC_NOT_FOUND } from "../model/error";
import { IUpdateTopicCommandHandler, UpdateTopicCommand } from "../interfaces";

export class UpdateTopicCommandHandler implements IUpdateTopicCommandHandler {
  constructor(
    private readonly queryRepo: IGetTopicQueryRepository,
    private readonly commandRepo: IUpdateTopicCommandRepository,
  ) {}

  async execute(command: UpdateTopicCommand): Promise<void> {
    const { id, dto } = command;
    const topicData = UpdateTopicSchema.parse(dto);

    // Check if topic exists
    const existingTopic = await this.queryRepo.getById(id);
    if (!existingTopic) {
      throw ERR_TOPIC_NOT_FOUND;
    }

    // If name is being updated, check for name collision
    if (topicData.name && topicData.name !== existingTopic.name) {
      const topicWithSameName = await this.queryRepo.getByName(topicData.name);
      if (topicWithSameName) {
        throw ERR_TOPIC_NAME_ALREADY_EXISTS;
      }
    }

    // Update the topic
    await this.commandRepo.update(id, topicData);
  }
} 