import {
  CustomAuthorizerEvent,
  AuthResponse
} from "aws-lambda";

export default interface IAuthorizationService {
  generateAuthResponse(event: CustomAuthorizerEvent): AuthResponse;
}