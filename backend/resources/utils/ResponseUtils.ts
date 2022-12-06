import { Effect } from "aws-cdk-lib/aws-iam";
import { APIGatewayProxyStructuredResultV2, AuthResponse } from "aws-lambda";
import { injectable } from "inversify";
import ErrorConstants from "../constants/ErrorConstants";
import HttpStatusCode from "../constants/HttpStatusCode";

@injectable()
export default class ResponseUtils {

  private static corsHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*"
  }

  public generateAuthResponse(principal: string, resource: string, effect: Effect): AuthResponse {
    return {
      principalId: principal,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: effect,
            Action: "execute-api:Invoke",
            Resource: resource
          }
        ]
      }
    };
  }

  public success(data?: any): APIGatewayProxyStructuredResultV2 {
    const response: APIGatewayProxyStructuredResultV2 = {
      statusCode: HttpStatusCode.OK
    };

    if (data) {
      response.body = JSON.stringify({ data });
    }

    response.headers = ResponseUtils.corsHeaders;

    return response;
  }

  public validationError(details?: string[]): APIGatewayProxyStructuredResultV2 {
    return {
      statusCode: HttpStatusCode.BAD_REQUEST,
      body: JSON.stringify({
        error: ErrorConstants.VALIDATION_ERROR,
        details
      }),
      headers: ResponseUtils.corsHeaders
    };
  }

  public notFound(): APIGatewayProxyStructuredResultV2 {
    return {
      statusCode: HttpStatusCode.NOT_FOUND,
      body: JSON.stringify({
        error: ErrorConstants.NOT_FOUND
      }),
      headers: ResponseUtils.corsHeaders
    };
  }

  public unauthorized(): APIGatewayProxyStructuredResultV2 {
    return {
      statusCode: HttpStatusCode.UNAUTHORIZED,
      body: JSON.stringify({
        error: ErrorConstants.UNAUTHORIZED
      }),
      headers: ResponseUtils.corsHeaders
    };
  }

  public internalServerError(): APIGatewayProxyStructuredResultV2 {
    return {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      body: ErrorConstants.INTERNAL_SERVER_ERROR,
      headers: ResponseUtils.corsHeaders
    };
  }
}