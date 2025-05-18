import { PagingResponseDTO } from "@share/dtos";
import { PagingDTO } from "@share/dtos";
import { CreateTopicDTO, FilterTopicDTO, UpdateTopicDTO } from ".";
import { Topic } from "../model";

export interface CreateTopicCommand {
  dto: CreateTopicDTO,
  // other dtos
}

export interface ICreateTopicCommandHandler {
  execute(command: CreateTopicCommand): Promise<string>;
}

export interface UpdateTopicCommand {
  id: string;
  dto: UpdateTopicDTO;
}

export interface IUpdateTopicCommandHandler {
  execute(command: UpdateTopicCommand): Promise<void>;
}

export interface DeleteTopicCommand {
  id: string;
  isHard: boolean;
}

export interface IDeleteTopicCommandHandler {
  execute(command: DeleteTopicCommand): Promise<void>;
}

export interface GetTopicQuery {
  id: string;
}

export interface IGetTopicQueryHandler {
  execute(query: GetTopicQuery): Promise<Topic | null>;
}

export interface GetTopicsQuery {
  paging: PagingDTO;
  filter: FilterTopicDTO;
}

export interface IListTopicsQueryHandler {
  execute(query: GetTopicsQuery): Promise<PagingResponseDTO<Topic>>;
}