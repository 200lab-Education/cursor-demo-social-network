import { PagingDTO, PagingResponseDTO } from "@share/dtos";
import { v7 } from "uuid";
import { ITopicService, ITopicRepository, CreateTopicDTO, FilterTopicDTO, UpdateTopicDTO } from "../interfaces";
import { Topic, TopicStatus } from "../model";
import { ERR_TOPIC_COLOR_REQUIRED, ERR_TOPIC_NAME_REQUIRED } from "../model/error";

export class TopicService implements ITopicService {
  constructor(private readonly repository: ITopicRepository) {}

  async createTopic(dto: CreateTopicDTO): Promise<string> {
    if (!dto.name) {
      throw ERR_TOPIC_NAME_REQUIRED;
    }

    if (!dto.color) {
      throw ERR_TOPIC_COLOR_REQUIRED;
    }

    const newTopic: Topic = {
      id: v7(),
      name: dto.name,
      color: dto.color,
      status: TopicStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      postCount: 0,
    };

    await this.repository.insert(newTopic);

    return newTopic.id;
  }

  async getTopics(paging: PagingDTO, filter: FilterTopicDTO): Promise<PagingResponseDTO<Topic>> {
    return await this.repository.list(paging, filter);
  }

  async getTopicById(id: string): Promise<Topic | null> {
    const data = await this.repository.getById(id);
    if (!data) {
      return null;
    }

    return data;
  }

  async updateTopic(id: string, dto: UpdateTopicDTO): Promise<boolean> {
    return await this.repository.update(id, dto);
  }

  async deleteTopic(id: string): Promise<boolean> {
    return await this.repository.delete(id, false);
  }
}