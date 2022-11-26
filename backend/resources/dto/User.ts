export enum personType {
  DOCTOR = "doctor",
  PATIENT = "patient",
};
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  type: personType;
  mobile_number: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
};
