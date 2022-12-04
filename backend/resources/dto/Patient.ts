export enum BloodType {
  A_PLUS = "A+",
  A_MINUS = "A-",
  B_PLUS = "B+",
  B_MINUS = "B-",
  O_PLUS = "O+",
  O_MINUS = "O-",
  AB_PLUS = "AB+",
  AB_MINUS = "AB-",
};

export enum Gender {
  MALE = "male",
  FEMALE = "female",
};

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  gender: Gender;
  blood_type: BloodType;
  weight: number;
  height: number;
  birth_date: Date;
  story: string;
  created_at: Date;
  updated_at: Date;
};
