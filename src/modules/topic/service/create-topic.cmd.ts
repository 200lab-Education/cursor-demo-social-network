import { v7 } from "uuid";
import { TopicStatus } from "../model";
import { CreateTopicDTO, createTopicSchema, ICreateTopicCommandRepository, IGetTopicQueryRepository } from "../interfaces";
import { Topic } from "../model";
import { ERR_TOPIC_NAME_ALREADY_EXISTS } from "../model/error";
import { CreateTopicCommand, ICreateTopicCommandHandler } from "../interfaces";

export class CreateTopicCommandHandler implements ICreateTopicCommandHandler {
  constructor(
    private readonly queryRepo: IGetTopicQueryRepository,
    private readonly commandRepo: ICreateTopicCommandRepository,
  ) {}

  async execute(command: CreateTopicCommand): Promise<string> {
    const topicData = createTopicSchema.parse(command.dto);

    const existingTopic = await this.queryRepo.getByName(topicData.name);
    if (existingTopic) {
      throw ERR_TOPIC_NAME_ALREADY_EXISTS;
    }

    const newTopic: Topic = {
      id: v7(),
      name: topicData.name,
      color: topicData.color,
      status: TopicStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      postCount: 0,
    };

    await this.commandRepo.insert(newTopic);

    return newTopic.id;
  }
}