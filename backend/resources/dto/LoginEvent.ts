import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export enum UserType {
  DOCTOR = "doctor",
  PATIENT = "patient"
}

export interface LoginEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: {
    email: string;
    password: string;
  },
  queryStringParameters: {
    user_type: UserType;
  }
}

export const validationSchema = yup.object({
  body: yup.object({
    email: yup.string()
      .email()
      .required(),
    password: yup.string()
      .required()
  }).required(),
  queryStringParameters: yup.object({
    user_type: yup.string()
      .oneOf(Object.values(UserType))
      .required()
  }).required()
});