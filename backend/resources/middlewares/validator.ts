import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import * as yup from "yup";
import container from "../config/inversify.config";
import { TYPES } from "../config/types";
import ResponseUtils from "../utils/ResponseUtils";

type Input = APIGatewayProxyEvent;
type Output = APIGatewayProxyStructuredResultV2;

const validator = (validationSchema: yup.ObjectSchema<any>): middy.MiddlewareObj<Input, Output> => {
  const before: middy.MiddlewareFn<Input, Output> = ({ event }): Output | void => {
    const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);
    
    try {
      validationSchema.validateSync(event, { abortEarly: false });
    } catch ({ errors }) {
      return responseUtils.validationError(errors as string[]); 
    }
  }

  return {
    before
  }
}

export default validator;