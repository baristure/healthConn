import {
  CustomAuthorizerEvent,
  AuthResponse
} from "aws-lambda";

export default interface IAuthService {

  generateAuthResponse(event: CustomAuthorizerEvent): AuthResponse;
}