import { PatientInput } from "../dto/PatientRegisterEvent";
import { Patient } from "../dto/Patient";

export default interface IUserRepository {
  getPatientById(id: number): Promise<Patient | null>;
  getPatientByEmail(email: string): Promise<Patient | null>;
  save(patient: PatientInput): Promise<Patient | null>;
  update(id: number, changes: Partial<PatientInput>): Promise<Patient | null>;
};
