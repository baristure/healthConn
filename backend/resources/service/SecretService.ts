import { SecretsManager } from "aws-sdk";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { ISecretService } from "./ISecretService";

@injectable()
export class SecretService implements ISecretService {

  @inject(TYPES.SecretsManager) private secretsManager: SecretsManager;

  public async getSecret<T>(secretId: string): Promise<T> {
    const { SecretString } = await this.secretsManager.getSecretValue({
      SecretId: secretId
    }).promise();

    return JSON.parse(SecretString!) as T;
  }
}