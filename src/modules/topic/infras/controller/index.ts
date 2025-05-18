import { Request, Response, Router } from "express";
import { 
  ITopicService,
  ICreateTopicCommandHandler, 
  IUpdateTopicCommandHandler, 
  UpdateTopicCommand, 
  IDeleteTopicCommandHandler,
  DeleteTopicCommand,
  IGetTopicQueryHandler,
  GetTopicQuery,
  IListTopicsQueryHandler,
  GetTopicsQuery,
  FilterTopicSchema,
} from "@modules/topic/interfaces";
import { StatusCodes } from "http-status-codes";
import { ErrNotFound } from "@share/controller";
import { pagingSchema } from "@share/dtos/paging";

export class TopicHTTPController {
  constructor(
    private readonly createTopicCommandHandler: ICreateTopicCommandHandler,
    private readonly getTopicByIdQueryHandler: IGetTopicQueryHandler,
    private readonly listTopicsQueryHandler: IListTopicsQueryHandler,
    private readonly updateTopicCommandHandler: IUpdateTopicCommandHandler,
    private readonly deleteTopicCommandHandler: IDeleteTopicCommandHandler,
  ) {}

  async createTopicAPI(req: Request, res: Response) {
    const dto = req.body;
    const newID = await this.createTopicCommandHandler.execute({ dto });

    res.status(StatusCodes.CREATED).json({data: newID});
  }

  async getTopicByIdAPI(req: Request, res: Response) {
    const { id } = req.params;
    const query: GetTopicQuery = { id };
    const topic = await this.getTopicByIdQueryHandler.execute(query);

    if (!topic) {
      throw ErrNotFound;
    }

    res.status(StatusCodes.OK).json({data: topic});
  }

  async updateTopicAPI(req: Request, res: Response) {
    const { id } = req.params;
    const dto = req.body;

    const cmd: UpdateTopicCommand = { id, dto };
    await this.updateTopicCommandHandler.execute(cmd);

    res.status(StatusCodes.OK).json({data: true});
  }

  async deleteTopicAPI(req: Request, res: Response) {
    const { id } = req.params;
    const isHard = true;

    const cmd: DeleteTopicCommand = { id, isHard };
    await this.deleteTopicCommandHandler.execute(cmd);
    
    res.status(StatusCodes.OK).json({data: true});
  }

  async listTopicsAPI(req: Request, res: Response) {
    const paging = pagingSchema.parse(req.query);
    const filter = FilterTopicSchema.parse(req.query);
    
    const query: GetTopicsQuery = { paging, filter };
    const dataPaginated = await this.listTopicsQueryHandler.execute(query);

    res.status(StatusCodes.OK).json(dataPaginated);
  }

  getRoutes(): Router {
    const router = Router();
    router.post("/topics", this.createTopicAPI.bind(this));
    router.get("/topics", this.listTopicsAPI.bind(this));
    router.get("/topics/:id", this.getTopicByIdAPI.bind(this));
    router.patch("/topics/:id", this.updateTopicAPI.bind(this));
    router.delete("/topics/:id", this.deleteTopicAPI.bind(this));
    return router;
  }
}