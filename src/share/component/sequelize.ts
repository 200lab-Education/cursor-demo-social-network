import { Sequelize } from "sequelize";
import { APP_CONFIG } from "./config";

export const sequelize = new Sequelize(
  APP_CONFIG.db.dsn,
  {
    pool: {
      max: 20,
      min: 2,
      acquire: 30000,
      idle: 60000,
    },
  });