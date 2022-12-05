export interface Appointment {
  id: number;
  doctor_id: number;
  patient_id: number;
  recognization: string;
  date: string;
  complaints: string;
  service_id: number;
}