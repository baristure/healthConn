import {
  CustomAuthorizerEvent,
  AuthResponse
} from "aws-lambda";

import container from "../../config/inversify.config";
import TYPES from "../../config/TYPES";
import IAuthorizationService from "../../services/IAuthorizationService";

export const lambdaHandler = (event: CustomAuthorizerEvent): AuthResponse => {
  const authService = container.get<IAuthorizationService>(TYPES.JwtAuthorizationService);
  return authService.generateAuthResponse(event);
};