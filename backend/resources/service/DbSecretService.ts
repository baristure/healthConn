import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { DbSecrets } from "../dto/DbSecrets";
import { IDbSecretService } from "./IDbSecretService";
import { ISecretService } from "./ISecretService";

@injectable()
export class DbSecretService implements IDbSecretService {
  
  @inject(TYPES.SecretService) private secretService: ISecretService;

  public async getSecret(): Promise<DbSecrets> {
    return await this.secretService.getSecret<DbSecrets>(process.env.DB_SECRET_ID!);
  }
}