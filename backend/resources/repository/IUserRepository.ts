import { UserInput } from "../dto/RegisterEvent";
import { User } from "../dto/User";

export default interface IUserRepository {

  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  save(user: UserInput): Promise<User | null>;
}