import { Doctor } from "./Doctor";
import { Patient } from "./Patient";
import { Complaint } from "./PostAppointmentEvent";

export interface AppointmentOutput {
  id: number;
  doctor: Doctor;
  patient: Patient;
  recognization: string;
  date: string;
  complaints: Complaint[]
}