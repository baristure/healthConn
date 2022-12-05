import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { TYPES } from "../config/types";
import { PatientInput } from "../dto/PatientRegisterEvent";
import { Patient } from "../dto/Patient";
import IPatientRepository from "./IPatientRepository";

@injectable()
export default class PatientRepository implements IPatientRepository {

  private knex: Knex;

  constructor(
    @inject(TYPES.Knex) knex: Knex
  ) {
    this.knex = knex;
  }

  public async getById(id: number): Promise<Patient | null> {
    return this.knex.select("*")
      .from("patients")
      .where({
        id
      })
      .first();
  }

  public async getByEmail(email: string): Promise<Patient | null> {
    return this.knex.select("*")
      .from("patients")
      .where({
        email
      })
      .first();
  }
  
  public async getByMobileNumber(mobile_number: string): Promise<Patient | null> {
    return this.knex.select("*")
      .from("patients")
      .where({
        mobile_number
      })
      .first();
  }

  public async save(patient: PatientInput): Promise<Patient | null> {
    const {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      gender,
      blood_type,
      weight,
      height,
      birth_date,
      story,
    } = patient;
    const [ savedPatient ] = await this.knex.insert({
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      gender,
      blood_type,
      weight,
      height,
      birth_date,
      story,
    })
      .into("patients")
      .returning("*");

    return savedPatient;
  }

  public async update(id: number, changes: Partial<PatientInput>): Promise<Patient | null> {
    const {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      gender,
      blood_type,
      weight,
      height,
      birth_date,
      story,
    } = changes;
    const [ updatedPatient ] = await this.knex.update({
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      gender,
      blood_type,
      weight,
      height,
      birth_date,
      story,
    })
      .where({
        id
      })
      .returning("*");

    return updatedPatient;
  }
};
