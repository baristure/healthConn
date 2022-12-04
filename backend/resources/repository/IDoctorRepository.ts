import { DoctorInput } from "../dto/DoctorRegisterEvent";
import { Doctor } from "../dto/Doctor";

export default interface IDoctorRepository {
  getById(id: number): Promise<Doctor | null>;
  getByEmail(email: string): Promise<Doctor | null>;
  save(doctor: DoctorInput): Promise<Doctor | null>;
  update(id: number, changes: Partial<DoctorInput>): Promise<Doctor | null>;
};
