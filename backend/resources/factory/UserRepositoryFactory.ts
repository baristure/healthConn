import { inject, injectable } from "inversify";
import { TYPES } from "../config/TYPES";
import { UserType } from "../dto/LoginEvent";
import IUserRepository from "../repository/IPatientRepository";
import createError from "http-errors";
import HttpStatusCode from "../constants/HttpStatusCode";

@injectable()
export class UserRepositoryFactory {

  private doctorRepository: IUserRepository;
  private patientRepository: IUserRepository;

  constructor(
    @inject(TYPES.DoctorRepository) doctorRepository: IUserRepository,
    @inject(TYPES.PatientRepository) patientRepository: IUserRepository,
  ) {
    this.doctorRepository = doctorRepository;
    this.patientRepository = patientRepository;
  }

  public getRepository(user_type: UserType): IUserRepository {
    switch (user_type) {
      case UserType.DOCTOR:
        return this.doctorRepository;
      case UserType.PATIENT:
        return this.patientRepository;
      default:
        throw createError(HttpStatusCode.BAD_REQUEST, "Unsupported user_type.");
    }
  }
}