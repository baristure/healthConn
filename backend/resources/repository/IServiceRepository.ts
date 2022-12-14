import  { Service, Speciality } from "../dto/Service";

export interface IServiceRepository {

  getAll(): Promise<Service[]>;
  getByName(name: Speciality): Promise<Service>;
};
