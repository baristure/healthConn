import  { Gender } from "./Patient";

export enum Title {
  DOCTOR= "doctor",
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
  office_number?: string;
  speciality: string;
  rating: number;
  title: Title;
  resume: string;
  image_url: string;
  gender: Gender;
  created_at: Date;
  updated_at: Date;
};
