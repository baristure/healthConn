import { inject, injectable } from "inversify";
import { Knex } from "knex";
import { TYPES } from "../config/types";
import { DoctorInput } from "../dto/DoctorRegisterEvent";
import { Doctor, DoctorByService } from "../dto/Doctor";
import IDoctorRepository from "./IDoctorRepository";
import { Speciality } from "../dto/Service";
import _ from "lodash";

@injectable()
export default class DoctorRepository implements IDoctorRepository {

  private knex: Knex;

  constructor(
    @inject(TYPES.Knex) knex: Knex
  ) {
    this.knex = knex;
  }
  
  async getDoctorRating(doctor_id: number): Promise<string> {
    const result = await this.knex.raw(
      `
      select coalesce(avg(point), 0) as rating
      from appointment_reviews ar
      join appointments a on a.id = ar.appointment_id 
      where a.doctor_id = ?
      `,
      [ doctor_id ]
    )

    return parseInt(result.rows[0].rating).toFixed(2)!;
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
  public async getDoctorsByService(serviceName: string): Promise<DoctorByService[] | null> {
    const { rows } = await this.knex.raw(
      `
      with cte as 
      (
        select
          d.id as doctor_id,
          coalesce(avg(ar.point), 0) as rating
        from doctors d 
        left join appointments a on a.doctor_id = d.id
        left join appointment_reviews ar on ar.appointment_id = a.id
        where d.speciality = ?
        group by d.id
      )
      select
        d.*,
        cte.rating
      from doctors as d
      join cte on cte.doctor_id = d.id
      `,
      [ serviceName ]
    );

    return (rows as DoctorByService[]).map(row => _.omit(row, "password"));
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
