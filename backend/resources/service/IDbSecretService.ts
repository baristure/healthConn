import { DbSecrets } from "../dto/DbSecrets";

export interface IDbSecretService {
  
  getSecret(): Promise<DbSecrets>;
}