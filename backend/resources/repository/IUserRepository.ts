export interface IUserRepository {

  getById(id: number): Promise<any>;
  getByEmail(email: string): Promise<any>;
}