import {
  SecretsManager
} from "aws-sdk";
import { interfaces } from "inversify";
import knex from "knex";
import { IDbSecretService } from "../service/IDbSecretService";
import { TYPES } from "./types";

export const secretsManager = () => new SecretsManager({ region: process.env.AWS_REGION });

export const knexClient = async (context: interfaces.Context) => {
  const dbSecretService = context.container.get<IDbSecretService>(TYPES.DbSecretService);
  const {
    host,
    port,
    username: user,
    password,
  } = await dbSecretService.getSecret();

  return knex({
    client: "pg",
    connection: {
      host,
      port,
      user,
      password,
      database: "postgres"
    },
    acquireConnectionTimeout: 30000
  });
}