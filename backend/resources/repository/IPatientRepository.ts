import { PatientInput } from "../dto/PatientRegisterEvent";
import { Patient } from "../dto/Patient";

export default interface IUserRepository {
  getById(id: number): Promise<Patient | null>;
  getByEmail(email: string): Promise<Patient | null>;
  save(patient: PatientInput): Promise<Patient | null>;
  update(id: number, changes: Partial<PatientInput>): Promise<Patient | null>;
};
