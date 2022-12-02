import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";
import { Gender, BloodType } from "./Patient";

export interface PatientInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  gender: Gender;
  blood_type: BloodType;
  weight: number;
  height: number;
  birth_date: Date;
  story: string;
};

export interface PatientRegisterEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: PatientInput
};

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
      .min(8)
      .max(32)
      .matches(/[\d]/, "password field should contain at least 1 digit")
      .matches(/[a-z]/, "password field should contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "password field should contain at least 1 uppercase letter")
      .required(),
    mobile_number: yup.string()
      .matches(/^\+\d+$/, "mobile_number field should be a valid E.164 phone number")
      .required(),
    gender: yup.string()
      .oneOf(Object.values(Gender))
      .required(),
    blood_type: yup.string()
      .oneOf(Object.values(BloodType))
      .required(),
    weight: yup.number()
      .positive()
      .integer()
      .required(),
    height: yup.number()
      .positive()
      .integer()
      .required(),
    birth_date: yup.date()
      .required(),
    story: yup.string()
      .required(),
  }).required()
});
