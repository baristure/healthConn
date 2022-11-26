import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { TYPES } from "../config/types";
import { DoctorInput } from "../dto/DoctorRegisterEvent";
import { Doctor } from "../dto/Doctor";
import IDoctorRepository from "./IDoctorRepository";

@injectable()
export default class DoctorRepository implements IDoctorRepository {

  private knex: Knex;

  constructor(
    @inject(TYPES.Knex) knex: Knex
  ) {
    this.knex = knex;
  }

  public async getDoctorById(id: number): Promise<Doctor | null> {
    return this.knex.select("*")
      .from("doctors")
      .where({
        id
      })
      .first();
  }

  public async getDoctorByEmail(email: string): Promise<Doctor | null> {
    return this.knex.select("*")
      .from("doctors")
      .where({
        email
      })
      .first();
  }

  public async save(doctor: DoctorInput): Promise<Doctor | null> {
    const {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      office_number,
      speciality,
      title,
      resume,
      gender,
      image_url,
     } = doctor;
    const [ savedDoctor ] = await this.knex.insert({
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      office_number,
      speciality,
      title,
      resume,
      gender,
      image_url,
    })
      .into("doctors")
      .returning("*");

    return savedDoctor;
  }

  public async update(id: number, changes: Partial<DoctorInput>): Promise<Doctor | null> {
    const {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      office_number,
      speciality,
      title,
      resume,
      gender,
      image_url,
      rating,
     } = changes;
    const [ updatedDoctor ] = await this.knex("doctors").update({
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      office_number,
      speciality,
      title,
      resume,
      gender,
      image_url,
      rating
    })
      .where({
        id
      })
      .returning("*");

    return updatedDoctor;
  }
};
