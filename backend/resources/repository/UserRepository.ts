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
      type: user.type,
      mobile_number: user.mobile_number,
      image_url: user.image_url
    })
      .into("users")
      .returning("*");

    return savedUser;
  }

  public async update(id: string, changes: Partial<UserInput>): Promise<User | null> {
    const [ updatedUser ] = await this.knex.update({
      first_name: changes.first_name,
      last_name: changes.last_name,
      email: changes.email,
      password: changes.password,
      type: changes.type,
      mobile_number: changes.mobile_number,
      image_url: changes.image_url
    })
      .where({
        id
      })
      .returning("*");

    return updatedUser;
  }

  // public async delete(id: string, type: userType): Promise<User | null> {
  //   return this.knex
  //     .from("users")
  //     .where({
  //       id
  //     })
  //     .join()
  //     .del();
  // }
};
