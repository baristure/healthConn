import { DoctorInput } from "../dto/DoctorRegisterEvent";
import { Doctor } from "../dto/Doctor";

export default interface IDoctorRepository {
  getDoctorById(id: number): Promise<Doctor | null>;
  getDoctorByEmail(email: string): Promise<Doctor | null>;
  save(user: DoctorInput): Promise<Doctor | null>;
  update(id: number, changes: Partial<DoctorInput>): Promise<Doctor | null>;
}