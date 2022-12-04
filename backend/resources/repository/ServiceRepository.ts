import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { Service } from "../dto/Service";
import { TYPES } from "../config/TYPES";
import { IServiceRepository } from "./IServiceRepository";
import { Speciality } from "../dto/Service";

@injectable()
export default class ServiceRepository implements IServiceRepository {

  private knex: Knex;

  constructor(
    @inject(TYPES.Knex) knex: Knex
  ) {
    this.knex = knex;
  }

  async getAll(): Promise<Service[]> {
    return this.knex.select("*")
      .from("services")
    }

  async getByName(name: Speciality): Promise<Service> {
    return this.knex.select("*")
      .from("services")
      .where({ name })
      .first();
  }
};
