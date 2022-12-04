import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { TYPES } from "../config/types";
import IDoctorMembershipRepository from "./IDoctorMembershipRepository";
import { DoctorMembership } from "../dto/DoctorMembership";

@injectable()
export default class DoctorMembershipRepository implements IDoctorMembershipRepository {

  private knex: Knex;

  constructor(
    @inject(TYPES.Knex) knex: Knex
  ) {
    this.knex = knex;
  }

  public async filterByDoctorId(id: number): Promise<DoctorMembership[]> {
    return this.knex.select("*")
      .from("doctor_memberships")
      .where({
        doctor_id: id
      })
  }
};
