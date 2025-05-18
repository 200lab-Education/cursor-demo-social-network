import { z } from "zod";
import { ERR_TOPIC_COLOR_MIN_LENGTH, ERR_TOPIC_COLOR_REQUIRED, ERR_TOPIC_NAME_MIN_LENGTH, ERR_TOPIC_NAME_REQUIRED } from "./error";

export enum TopicStatus {
  ACTIVE = "active",
  DELETED = "deleted",
}

export const topicSchema = z.object({
  id: z.string().uuid(),
  name: z.string({ required_error: ERR_TOPIC_NAME_REQUIRED.message }).min(3, ERR_TOPIC_NAME_MIN_LENGTH.message).max(100),
  color: z.string({ required_error: ERR_TOPIC_COLOR_REQUIRED.message }).min(3, ERR_TOPIC_COLOR_MIN_LENGTH.message).max(100),
  postCount: z.number().int().positive().default(0),
  status: z.nativeEnum(TopicStatus).default(TopicStatus.ACTIVE),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

// Business model
export type Topic = z.infer<typeof topicSchema>;