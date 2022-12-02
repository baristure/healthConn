import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { TYPES } from "../config/TYPES";
import { Appointment } from "../dto/Appointment";
import { IAppointmentRepository } from "./IAppointmentRepository";

@injectable()
export class AppointmentRepository implements IAppointmentRepository {

  private knex: Knex;

  constructor(
    @inject(TYPES.Knex) knex: Knex
  ) {
    this.knex = knex;
  }

  async create(appointment: Appointment): Promise<Appointment> {
    const [ rs ] = await this.knex.insert(appointment)
      .into("appointments")
      .returning("*");

    return rs;
  }

  async getById(id: number): Promise<Appointment> {
    return this.knex.select("*")
      .from("appointments")
      .where({ id })
      .first();
  }

}