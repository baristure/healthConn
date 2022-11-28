import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";
import { personType } from "./User";

export interface UserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  type: personType;
  image_url: string;
};

export interface RegisterEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: UserInput
};

export const validationSchema = yup.object({
  body: yup.object({
    first_name: yup.string()
      .required(),
    last_name: yup.string()
      .required(),
    email: yup.string()
      .email()
      .required(),
    password: yup.string()
      .required(),
    mobile_number: yup.string()
      .required(),
    type: yup.string()
      .required(),
    image_url: yup.string()
      .required(),
  }).required()
});
