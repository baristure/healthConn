import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";


export enum UserType {
  DOCTOR = "doctor",
  PATIENT = "patient"
}

export interface UserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  type: UserType;
  image_url?: string;
}

export interface RegisterEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: UserInput
}

export const validationSchema = yup.object({
  body: yup.object({
    first_name: yup.string()
      .max(255)
      .required(),
    last_name: yup.string()
      .max(255)
      .required(),
    email: yup.string()
      .email()
      .max(255)
      .required(),
    password: yup.string()
      .matches(/[\d]/, "password field should contain at least 1 digit")
      .matches(/[a-z]/, "password field should contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "password field should contain at least 1 uppercase letter")
      .required(),
    mobile_number: yup.string()
      .matches(/^\+\d+$/, "mobile_number field should be a valid E.164 phone number")
      .required(),
    type: yup.string()
      .oneOf(Object.values(UserType))
      .required(),
    image_url: yup.string()
      .url()
  }).required()
});