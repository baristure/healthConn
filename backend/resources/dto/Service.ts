export enum Speciality {
  RADIOLOGY = "Radiology",
  PSYCOLOGY = "Psychology",
  PATOLOGY = "Pathology",
  ORAL_DENTAL = "Oral and Dental Health",
  SPORTS = "Sports Medicine",
  HEMATOLOGY = "Hematology",
  GASTROENTEROLOGY = "Gastroenterology",
  ENDICRINOLOGY = "Endocrinology",
  DERMATOLOGY = "Dermatology",
  CARDIOLOGY = "Cardiology",
  ANESTHESIOLOGY = "Anesthesiology",
};

export interface Service {
  id: number;
  name: Speciality;
};
