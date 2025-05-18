import { PagingDTO, PagingResponseDTO } from "@share/dtos";
import { Topic, topicSchema, TopicStatus } from "../model";
import { z } from "zod";

export * from "./handler";

export const createTopicSchema = topicSchema.pick({
  name: true,
  color: true,
}).required();

export type CreateTopicDTO = z.infer<typeof createTopicSchema>;

export const FilterTopicSchema = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  status: z.nativeEnum(TopicStatus).optional(),
});

export type FilterTopicDTO = z.infer<typeof FilterTopicSchema>;

export const UpdateTopicSchema = topicSchema.pick({
  name: true,
  color: true,
  status: true,
}).partial();

export type UpdateTopicDTO = z.infer<typeof UpdateTopicSchema>;

export interface ITopicService {
  createTopic(dto: CreateTopicDTO): Promise<string>;
  getTopics(paging: PagingDTO, filter: FilterTopicDTO): Promise<PagingResponseDTO<Topic>>;
  getTopicById(id: string): Promise<Topic | null>;
  updateTopic(id: string, dto: UpdateTopicDTO): Promise<boolean>;
  deleteTopic(id: string): Promise<boolean>;
}

export interface ICommandTopicRepository {
  insert(dto: Topic): Promise<boolean>;
  update(id: string, dto: UpdateTopicDTO): Promise<boolean>;
  delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface IListTopicQueryRepository {
  list(paging: PagingDTO, filter: FilterTopicDTO): Promise<PagingResponseDTO<Topic>>;
}

export interface IGetTopicQueryRepository {
  getByName(name: string): Promise<Topic | null>;
  getById(id: string): Promise<Topic | null>;
}

export interface ICreateTopicCommandRepository {
  insert(dto: Topic): Promise<boolean>;
}

export interface IUpdateTopicCommandRepository {
  update(id: string, dto: UpdateTopicDTO): Promise<boolean>;
}

export interface IDeleteTopicCommandRepository {
  delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface ITopicRepository extends ICommandTopicRepository, IListTopicQueryRepository, IGetTopicQueryRepository, IUpdateTopicCommandRepository {}


