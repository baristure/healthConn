export interface ISecretService {
  
  getSecret<T>(secretId: string): Promise<T>;
}