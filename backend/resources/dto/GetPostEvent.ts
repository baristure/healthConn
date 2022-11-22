import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetPostEvent extends APIGatewayProxyEvent {
  pathParameters: {
    post_id: string;
  }
}

export const validationSchema = yup.object({
  pathParameters: yup.object({
    post_id: yup.string()
      .required()
  }).required()
});