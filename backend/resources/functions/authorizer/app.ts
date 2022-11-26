import "reflect-metadata";
import {
  AuthResponse, CustomAuthorizerEvent
} from "aws-lambda";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import IAuthService from "../../service/IAuthService";

export const lambdaHandler = async (event: CustomAuthorizerEvent): Promise<AuthResponse> => {

  const authService = container.get<IAuthService>(TYPES.JwtAuthService);
  return authService.generateAuthResponse(event);
};