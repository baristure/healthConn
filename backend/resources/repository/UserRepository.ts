import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { TYPES } from "../config/types";
import { UserInput } from "../dto/RegisterEvent";
import { User } from "../dto/User";
import IUserRepository from "./IUserRepository";


@injectable()
export default class UserRepository implements IUserRepository {

  private knex: Knex;

  constructor(
    @inject(TYPES.Knex) knex: Knex
  ) {
    this.knex = knex;
  }

  public async getUserById(id: string): Promise<User | null> {
    return this.knex.select("*")
      .from("users")
      .where({
        id
      })
      .first();
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.knex.select("*")
      .from("users")
      .where({
        email
      })
      .first();
  }

  public async save(user: UserInput): Promise<User | null> {
    const [ savedUser ] = await this.knex.insert({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,

    })
      .into("users")
      .returning("*");

    return savedUser;
  }
}