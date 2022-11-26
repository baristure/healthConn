import  { gender } from "./Patient";

export enum title {
  DOCTOR= "doctor",
  PROFSSOR = "professor",
  NURSE = "nurse",
};

export enum lifestyleType {
  SEDENTERY = "sedentary",
  BALANCED = "balanced", 
  ACTIVE = "active",
};

export interface Patient {
  user_id: string;
  office_number: string;
  speciality: string;
  rating: number;
  title: title;
  resume: string;
  services: string;
  gender: gender;
  created_at: Date;
  updated_at: Date;
};
