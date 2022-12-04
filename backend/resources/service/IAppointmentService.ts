import { Appointment } from "../dto/Appointment";
import { AppointmentOutput } from "../dto/AppointmentOutput";

export interface IAppointmentService {

  create(appointment: Appointment): Promise<AppointmentOutput>;
  getById(id: number): Promise<AppointmentOutput | null>;
}