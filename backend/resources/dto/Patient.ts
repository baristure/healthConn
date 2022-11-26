export enum bloodGroup {
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
  MALE= "male",
  FEMALE = "female",
};

export enum lifestyleType {
  SEDENTERY = "sedentary",
  BALANCED = "balanced", 
  ACTIVE = "active",
};

export interface Patient {
  user_id: string;
  blood_group: string;
  weight: number;
  length: number;
  birth_date: Date;
  gender: Gender;
  lifestyle: lifestyleType;
  allergies: string;
  created_at: Date;
  updated_at: Date;
};
