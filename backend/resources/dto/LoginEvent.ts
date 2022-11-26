import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface LoginEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: {
    email: string;
    password: string;
  }
}

export const validationSchema = yup.object({
  body: yup.object({
    email: yup.string()
      .email()
      .required(),
    password: yup.string()
      .required()
  }).required()
});