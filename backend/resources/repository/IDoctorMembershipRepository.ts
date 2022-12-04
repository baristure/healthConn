import { DoctorMembership } from "../dto/DoctorMembership";

export default interface IDoctorMembershipRepository {
  filterByDoctorId(id: number): Promise<DoctorMembership[] | null>;
};
