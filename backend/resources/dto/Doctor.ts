import  { Gender } from "./Patient";
import { Speciality } from "./Service";

export enum Title {
  DOCTOR = "doctor",
  PROFESSOR = "professor",
  NURSE = "nurse",
};

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  office_number: string;
  speciality: Speciality;
  title: Title;
  resume: string;
  image_url: string;
  gender: Gender;
  office_location: string;
  created_at: Date;
  updated_at: Date;
};

export interface DoctorByService extends Omit<Doctor, "password"> {
  rating: number;
};
