import { TopicStatus } from "@modules/topic/model";

import { FilterTopicDTO, UpdateTopicDTO } from "@modules/topic/interfaces";
import { PagingDTO } from "@share/dtos";

import { ITopicRepository } from "@modules/topic/interfaces";
import { Topic } from "@modules/topic/model";
import { PagingResponseDTO } from "@share/dtos";
import { ERR_TOPIC_NOT_FOUND } from "@modules/topic/model/error";

export class TopicInmemoryRepository implements ITopicRepository {
  private topics: Topic[] = [];

  async insert(dto: Topic): Promise<boolean> {
    this.topics.push(dto);
    return true;
  }
  
  async list(paging: PagingDTO, filter: FilterTopicDTO): Promise<PagingResponseDTO<Topic>> {
    const topics = this.topics.filter((topic) => {
      if (filter.name) {
        return topic.name.includes(filter.name);
      }
      if (filter.color) {
        return topic.color.includes(filter.color);
      }
      return true;
    });

    const total = topics.length;
    const data = topics.slice(paging.page * paging.limit, (paging.page + 1) * paging.limit);
    return { data, total, page: paging.page, limit: paging.limit };
  }

  async getById(id: string): Promise<Topic> {
    const topic = this.topics.find((topic) => topic.id === id);
    
    if (!topic) {
      throw ERR_TOPIC_NOT_FOUND;
    }

    return topic;
  }

  async update(id: string, dto: UpdateTopicDTO): Promise<boolean> {
    const topic = await this.getById(id);
    Object.assign(topic, dto);
    return true;
  }

  async delete(id: string, isHard: boolean): Promise<boolean> {
    const topic = await this.getById(id);

    if (isHard) {
      this.topics = this.topics.filter((t) => t.id !== id);
    } else {
      topic.status = TopicStatus.DELETED;
      topic.updatedAt = new Date();
    }

    return true;
  }
}