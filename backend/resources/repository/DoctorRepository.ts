import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { TYPES } from "../config/types";
import { DoctorInput } from "../dto/DoctorRegisterEvent";
import { Doctor, DoctorByService } from "../dto/Doctor";
import IDoctorRepository from "./IDoctorRepository";
import { Speciality } from "../dto/Service";

@injectable()
export default class DoctorRepository implements IDoctorRepository {

  private knex: Knex;

  constructor(
    @inject(TYPES.Knex) knex: Knex
  ) {
    this.knex = knex;
  }

  public async getById(id: number): Promise<Doctor | null> {
    return this.knex.select("*")
      .from("doctors")
      .where({
        id
      })
      .first();
  }

  public async getByEmail(email: string): Promise<Doctor | null> {
    return this.knex.select("*")
      .from("doctors")
      .where({
        email
      })
      .first()
  }
  
  public async getByMobileNumber(mobile_number: string): Promise<Doctor | null> {
    return this.knex.select("*")
      .from("doctors")
      .where({
        mobile_number
      })
      .first()
  }
  
  public async getByOfficeNumber(office_number: string): Promise<Doctor | null> {
    return this.knex.select("*")
      .from("doctors")
      .where({
        office_number
      })
      .first()
  }

  // TODO add paging 
  public async getDoctorsByService(serviceName: Speciality): Promise<DoctorByService[] | null> {
    return this.knex.select(
      "id",
      "first_name",
      "last_name",
      "mobile_number",
      "office_number",
      "speciality",
      "gender",
      "image_url",
    )
    .from("doctors")
    .where({
      speciality: serviceName
    })
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
      office_location
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
      office_location
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
      office_location
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
      office_location
    })
      .where({
        id
      })
      .returning("*");

    return updatedDoctor;
  }
};
