import { Container } from "inversify";
import IAuthorizationService from "../services/IAuthorizationService";
import JwtAuthorizationService from "../services/JwtAuthorizationService";
import TYPES from "./TYPES";

const container = new Container();

container.bind<IAuthorizationService>(TYPES.JwtAuthorizationService).to(JwtAuthorizationService);

export default container;