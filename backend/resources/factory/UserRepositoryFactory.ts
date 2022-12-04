import { inject, injectable } from "inversify";
import { TYPES } from "../config/TYPES";
import { UserType } from "../dto/LoginEvent";
import IPatientRepository from "../repository/IPatientRepository";
import createError from "http-errors";
import HttpStatusCode from "../constants/HttpStatusCode";
import IDoctorRepository from "../repository/IDoctorRepository";

@injectable()
export class UserRepositoryFactory {

  private doctorRepository: IDoctorRepository;
  private patientRepository: IPatientRepository;

  constructor(
    @inject(TYPES.DoctorRepository) doctorRepository: IDoctorRepository,
    @inject(TYPES.PatientRepository) patientRepository: IPatientRepository,
  ) {
    this.doctorRepository = doctorRepository;
    this.patientRepository = patientRepository;
  }

  public getRepository(user_type: UserType): IPatientRepository | IDoctorRepository {
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