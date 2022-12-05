import { SecretsManager } from "aws-sdk";
import { Container } from "inversify";
import { TYPES } from "./types";
import { secretsManager } from "./appConfig";
import { ISecretService } from "../service/ISecretService";
import { SecretService } from "../service/SecretService";
import { IDbSecretService } from "../service/IDbSecretService";
import { DbSecretService } from "../service/DbSecretService";
import { Knex } from "knex";
import {
  knexClient
} from "./appConfig";
import RequestUtils from "../utils/RequestUtils";
import ResponseUtils from "../utils/ResponseUtils";
import IAuthService from "../service/IAuthService";
import JwtAuthService from "../service/JwtAuthService";
import IPatientRepository from "../repository/IPatientRepository";
import PatientRepository from "../repository/PatientRepository";
import IDoctorRepository from "../repository/IDoctorRepository";
import DoctorRepository from "../repository/DoctorRepository";
import { UserRepositoryFactory } from "../factory/UserRepositoryFactory";
import { IServiceRepository } from "../repository/IServiceRepository";
import ServiceRepository from "../repository/ServiceRepository";
import IDoctorMembershipRepository from "../repository/IDoctorMembershipRepository";
import DoctorMembershipRepository from "../repository/DoctorMembershipRepository";
import { IAppointmentRepository } from "../repository/IAppointmentRepository";
import { AppointmentRepository } from "../repository/AppointmentRepository";
import { IAppointmentService } from "../service/IAppointmentService";
import { AppointmentService } from "../service/AppointmentService";

const container = new Container();

container.bind<SecretsManager>(TYPES.SecretsManager).toConstantValue(secretsManager());
container.bind<ISecretService>(TYPES.SecretService).to(SecretService);
container.bind<IDbSecretService>(TYPES.DbSecretService).to(DbSecretService);
container.bind<Knex>(TYPES.Knex).toDynamicValue(knexClient);
container.bind<RequestUtils>(TYPES.RequestUtils).to(RequestUtils);
container.bind<ResponseUtils>(TYPES.ResponseUtils).to(ResponseUtils);
container.bind<IAuthService>(TYPES.JwtAuthService).to(JwtAuthService);
container.bind<IPatientRepository>(TYPES.PatientRepository).to(PatientRepository);
container.bind<IDoctorRepository>(TYPES.DoctorRepository).to(DoctorRepository);
container.bind<UserRepositoryFactory>(TYPES.UserRepositoryFactory).to(UserRepositoryFactory);
container.bind<IServiceRepository>(TYPES.ServiceRepository).to(ServiceRepository);
container.bind<IDoctorMembershipRepository>(TYPES.DoctorMembershipRepository).to(DoctorMembershipRepository);
container.bind<IAppointmentRepository>(TYPES.AppointmentRepository).to(AppointmentRepository);
container.bind<IAppointmentService>(TYPES.AppointmentService).to(AppointmentService);

export default container;
