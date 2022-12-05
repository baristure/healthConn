import { DoctorInput } from "../dto/DoctorRegisterEvent";
import { Doctor, DoctorByService } from "../dto/Doctor";
import { Speciality } from "../dto/Service";

export default interface IDoctorRepository {

  getByEmail(email: string): Promise<Doctor | null>;
  getById(id: number): Promise<Doctor | null>;
  getDoctorsByService(serviceName: Speciality): Promise<DoctorByService[] | null>;
  save(doctor: DoctorInput): Promise<Doctor | null>;
  update(id: number, changes: Partial<DoctorInput>): Promise<Doctor | null>;
  getByMobileNumber(mobile_number: string): Promise<Doctor | null>;
  getByOfficeNumber(office_number: string): Promise<Doctor | null>
  };
