import { PagingDTO, PagingResponseDTO } from "@share/dtos";
import { Topic, TopicStatus } from "../model";
import { z } from "zod";
import { ERR_TOPIC_COLOR_REQUIRED, ERR_TOPIC_NAME_REQUIRED } from "../model/error";

export const createTopicSchema = z.object({
  name: z.string().min(3, ERR_TOPIC_NAME_REQUIRED),
  color: z.string().min(3, ERR_TOPIC_COLOR_REQUIRED),
});

export type CreateTopicDTO = z.infer<typeof createTopicSchema>;

export const FilterTopicSchema = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  status: z.nativeEnum(TopicStatus).optional(),
});

export type FilterTopicDTO = z.infer<typeof FilterTopicSchema>;

export const UpdateTopicSchema = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  status: z.nativeEnum(TopicStatus).optional(),
});

export type UpdateTopicDTO = z.infer<typeof UpdateTopicSchema>;

export interface ITopicService {
  createTopic(dto: CreateTopicDTO): Promise<string>;
  getTopics(paging: PagingDTO, filter: FilterTopicDTO): Promise<PagingResponseDTO<Topic>>;
  getTopicById(id: string): Promise<Topic | null>;
  updateTopic(id: string, dto: UpdateTopicDTO): Promise<boolean>;
  deleteTopic(id: string): Promise<boolean>;
}

export interface ITopicRepository {
  insert(dto: Topic): Promise<boolean>;
  list(paging: PagingDTO, filter: FilterTopicDTO): Promise<PagingResponseDTO<Topic>>;
  getById(id: string): Promise<Topic | null>;
  update(id: string, dto: UpdateTopicDTO): Promise<boolean>;
  delete(id: string, isHard: boolean): Promise<boolean>;
}
