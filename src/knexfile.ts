import dotenv from "dotenv";
import { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";

dotenv.config();

export const development: Knex.Config = {
  client: "pg",
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  ...knexSnakeCaseMappers(),
};
