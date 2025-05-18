import { FilterTopicDTO, ITopicRepository, UpdateTopicDTO } from "@modules/topic/interfaces";
import { Topic, TopicStatus } from "@modules/topic/model";
import { TopicPersistent } from "./dto";
import { PagingDTO } from "@share/dtos";
import { PagingResponseDTO } from "@share/dtos";
import { Op } from "sequelize";

export class TopicSequelizeRepository implements ITopicRepository {
  async list(paging: PagingDTO, filter: FilterTopicDTO): Promise<PagingResponseDTO<Topic>> {
    const cond: any = {
      ...(filter.name && { name: { [Op.like]: `%${filter.name}%` } }),
      ...(filter.color && { color: `${filter.color}` }),
      ...(filter.status && { status: filter.status }),
    };

    const { count, rows } = await TopicPersistent.findAndCountAll({
      where: cond,
      order: [['created_at', 'DESC']],
      offset: (paging.page - 1) * paging.limit,
      limit: paging.limit,
    });

    return {
      total: count,
      page: paging.page,
      limit: paging.limit,
      data: rows.map((topic) => this._toModel(topic)),
    };
  }

  async insert(dto: Topic): Promise<boolean> {
    await TopicPersistent.create(this._toPersistent(dto));
    return true;
  }

  async findByName(name: string): Promise<Topic | null> {
    const topic = await TopicPersistent.findOne({ where: { name } });
    return topic ? this._toModel(topic) : null;
  }

  async getById(id: string): Promise<Topic | null> {
    const topic = await TopicPersistent.findByPk(id);
    return topic ? this._toModel(topic) : null;
  }

  async update(id: string, dto: UpdateTopicDTO): Promise<boolean> {
    await TopicPersistent.update(dto, { where: { id } });
    return true;
  }

  async delete(id: string, isHard: boolean): Promise<boolean> {
    if (isHard) {
      await TopicPersistent.destroy({ where: { id } });
    } else {
      await TopicPersistent.update({ status: TopicStatus.DELETED }, { where: { id } });
    }

    return true;
  }

  private _toModel(topic: TopicPersistent): Topic {
    const { created_at, updated_at, ...data } = topic.get({ plain: true });

    return {
      ...data,
      createdAt: created_at,
      updatedAt: updated_at,
    };
  }

  private _toPersistent(topic: Topic): any {
    const { createdAt, updatedAt, ...data } = topic;

    return {
      ...data,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
}