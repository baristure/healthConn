import "reflect-metadata";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/TYPES";
import { IDbSecretService } from "../../service/IDbSecretService";
import {
	Liquibase,
	POSTGRESQL_DEFAULT_CONFIG,
} from 'node-liquibase';

export const lambdaHandler = async () => {
  const dbSecretService = await container.getAsync<IDbSecretService>(TYPES.DbSecretService);
  const {
    host,
    password,
    port,
    username
  } = await dbSecretService.getSecret();

  const liquibase = new Liquibase({
		...POSTGRESQL_DEFAULT_CONFIG,
		changeLogFile: "./migrations/master-changelog.xml",
		url: `jdbc:postgresql://${host}:${port}/postgres`,
		username,
		password
	})

	liquibase.update({});
}