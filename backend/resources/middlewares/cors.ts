import middy from "@middy/core";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyStructuredResultV2
} from "aws-lambda";

const cors = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyStructuredResultV2> => {
  const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyStructuredResultV2> = async ({ response }): Promise<APIGatewayProxyStructuredResultV2 | void> => {
    return {
      ...response,
      headers: {
        ...response?.headers,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*"
      }
    };
  }

  return {
    after
  }
}

export default cors;