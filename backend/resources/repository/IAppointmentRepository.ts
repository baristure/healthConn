import { Appointment } from "../dto/Appointment";

export interface IAppointmentRepository {

  create(appointment: Appointment): Promise<Appointment>;
  getById(id: number): Promise<Appointment>;
}