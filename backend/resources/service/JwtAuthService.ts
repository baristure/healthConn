import { CustomAuthorizerEvent, APIGatewayAuthorizerResult } from "aws-lambda";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import ErrorConstants from "../constants/ErrorConstants";
import RequestUtils from "../utils/RequestUtils";
import ResponseUtils from "../utils/ResponseUtils";
import IAuthService from "./IAuthService";
import { verify } from "jsonwebtoken";
import { Effect } from "aws-cdk-lib/aws-iam";


@injectable()
export default class JwtAuthService implements IAuthService {

  private requestUtils: RequestUtils;
  private responseUtils: ResponseUtils;

  constructor(
    @inject(TYPES.RequestUtils) requestUtils: RequestUtils,
    @inject(TYPES.ResponseUtils) responseUtils: ResponseUtils,
  ) {
    this.requestUtils = requestUtils;
    this.responseUtils = responseUtils;
  }

  public generateAuthResponse(event: CustomAuthorizerEvent): APIGatewayAuthorizerResult {
    const resource = event.methodArn;
    const rawBearer = event?.headers?.Authorization;

    const jwt = this.requestUtils.extractJwtFromRawBearer(rawBearer);

    try {
      verify(jwt!, process.env.SECRET_KEY!);
    } catch (e) {
      throw new Error(ErrorConstants.UNAUTHORIZED);
    }

    return this.responseUtils.generateAuthResponse("user", resource, Effect.ALLOW);
  }

}