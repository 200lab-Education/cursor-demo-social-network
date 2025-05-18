import { Request, Response, Router } from "express";
import { ITopicService } from "@modules/topic/interfaces";
import { StatusCodes } from "http-status-codes";

export class TopicHTTPController {
  constructor(private readonly service: ITopicService) {}

  async createTopicAPI(req: Request, res: Response) {
    const dto = req.body;
    const newID = await this.service.createTopic(dto);

    res.status(StatusCodes.CREATED).json({data: newID});
  }

  getRoutes(): Router {
    const router = Router();
    router.post("/topics", this.createTopicAPI.bind(this));
    return router;
  }
}