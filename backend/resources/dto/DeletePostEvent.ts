import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface DeletePostEvent extends APIGatewayProxyEvent {
  pathParameters: {
    user_id: string;
    post_id: string;
  }
}

export const validationSchema = yup.object({
  pathParameters: yup.object({
    user_id: yup.string()
      .required(),
    post_id: yup.string()
      .required()
  }).required()
});