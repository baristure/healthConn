export enum DoctorExpertise {
  MEMBERSHIP = "Membership",
  PUBLICATION = "Publication"
};

export interface DoctorMembership {
  id: number;
  doctor_id: number;
  type: DoctorExpertise;
  name: string;
};
