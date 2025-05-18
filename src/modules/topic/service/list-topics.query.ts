import { IListTopicQueryRepository } from "../interfaces";
import { GetTopicsQuery, IListTopicsQueryHandler } from "../interfaces/handler";
import { PagingResponseDTO } from "@share/dtos";
import { Topic } from "../model";
import { ErrInternalServer } from "@share/controller";

export class ListTopicsQueryHandler implements IListTopicsQueryHandler {
  constructor(private readonly queryRepo: IListTopicQueryRepository) {}

  async execute(query: GetTopicsQuery): Promise<PagingResponseDTO<Topic>> {
    try {
      return await this.queryRepo.list(query.paging, query.filter);
    } catch (err) {
      throw ErrInternalServer.wrap(err).withLog(err.message);
    }
  }
}