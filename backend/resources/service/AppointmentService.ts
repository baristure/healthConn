import { inject, injectable } from "inversify";
import { TYPES } from "../config/TYPES";
import { Appointment } from "../dto/Appointment";
import { AppointmentOutput } from "../dto/AppointmentOutput";
import { IAppointmentRepository } from "../repository/IAppointmentRepository";
import IDoctorRepository from "../repository/IDoctorRepository";
import { IAppointmentService } from "./IAppointmentService";
import IPatientRepository from "../repository/IPatientRepository";
import { Complaint } from "../dto/PostAppointmentEvent";

@injectable()
export class AppointmentService implements IAppointmentService {

  private appointmentRepository: IAppointmentRepository;
  private doctorRepository: IDoctorRepository;
  private patientRepository: IPatientRepository;

  constructor(
    @inject(TYPES.AppointmentRepository) appointmentRepository: IAppointmentRepository,
    @inject(TYPES.DoctorRepository) doctorRepository: IDoctorRepository,
    @inject(TYPES.PatientRepository) patientRepository: IPatientRepository
  ) {
    this.appointmentRepository = appointmentRepository;
    this.doctorRepository = doctorRepository;
    this.patientRepository = patientRepository;
  }

  async create(appointment: Appointment): Promise<AppointmentOutput> {
    const {
      id,
      doctor_id,
      patient_id,
      recognization,
      date,
      complaints
    } = await this.appointmentRepository.create(appointment);

    const doctor = await this.doctorRepository.getDoctorById(doctor_id);
    const patient = await this.patientRepository.getPatientById(patient_id);

    return {
      id,
      doctor: doctor!,
      patient: patient!,
      recognization,
      date,
      complaints: JSON.parse(complaints) as Complaint[]
    }
  }

  async getById(id: number): Promise<AppointmentOutput | null> {
    const appointment = await this.appointmentRepository.getById(id);

    if (!appointment) {
      return null;
    }

    const {
      doctor_id,
      patient_id,
      recognization,
      date,
      complaints
    } = appointment;

    const doctor = await this.doctorRepository.getDoctorById(doctor_id);
    const patient = await this.patientRepository.getPatientById(patient_id);

    return {
      id,
      doctor: doctor!,
      patient: patient!,
      recognization,
      date,
      complaints: JSON.parse(complaints) as Complaint[]
    }
  }
}