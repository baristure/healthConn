import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetUserByIdEvent extends APIGatewayProxyEvent {
  pathParameters: {
    user_id: string;
  }
};

export const validationSchema = yup.object({
  pathParameters: yup.object({
    user_id: yup.string()
      .required()
  })
    .required()
});
