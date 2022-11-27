import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";
import { Title } from "./Doctor";
import { Gender } from "./Patient";

export interface DoctorInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_number: string;
  office_number?: string;
  speciality: string;
  title: Title;
  resume: string;
  image_url: string;
  gender: Gender;
  rating?: number;
};

export interface DoctorRegisterEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: DoctorInput
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
    office_number: yup.string()
      .required(),
    speciality: yup.string()     
      .required(),
    title: yup.string()
      .oneOf(Object.values(Title))
      .required(),
    resume: yup.string()
      .required(),
    image_url: yup.string()
      .url()
      .required(),
    gender: yup.string()
      .oneOf(Object.values(Gender))
      .required(),
    rating: yup.number()
      .positive(),
  }).required()
});
