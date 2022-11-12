import { Effect } from "aws-cdk-lib/aws-iam";
import {
  AuthResponse, CustomAuthorizerEvent
} from "aws-lambda";
import { injectable } from "inversify";
import { verify } from "jsonwebtoken";
import IAuthorizationService from "./IAuthorizationService";

@injectable()
export default class JwtAuthorizationService implements IAuthorizationService {
  
  public generateAuthResponse(event: CustomAuthorizerEvent): AuthResponse {
    const jwt = this.extractJwtFromRawBearer(event?.headers?.Authorization);
    const methodArn = event.methodArn;

    try {
      verify(jwt!, process.env.SECRET_KEY!);
    } catch (e) {
      throw new Error(ErrorConstants.UNAUTHORIZED);
    }

    return this.getPolicyDocument(methodArn);
  }

  private getPolicyDocument(methodArn: string): AuthResponse {
    return {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: Effect.ALLOW,
            Resource: methodArn
          }
        ]
      }
    };
  }

  private extractJwtFromRawBearer(rawBearer: string | undefined): string | undefined {
    return rawBearer?.slice("Bearer ".length);
  }
}