import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";
import { Complaint, BodySide } from "./PostAppointmentEvent";

export interface PutAppointmentEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: {
    userId: number;
    doctorId: number;
    serviceId: number;
    recognization: string;
    date: string;
    complaints: Complaint[];
  } 
}

export const validationSchema = yup.object({
  body: yup.object({
    userId: yup.number()
      .required(),
    doctorId: yup.number()
      .required(),
    serviceId: yup.number()
      .required(),
    date: yup.date()
      .required(),
    recognization: yup.string()
      .required(),
    complaints: yup.array()
      .of(yup.object({
        part: yup.string()
          .required(),
        side: yup.string()
          .oneOf(Object.values(BodySide))
          .required(),
        severity: yup.number()
          .min(1)
          .max(10)
          .required(),
        comment: yup.string()
      }))
  })
}).required()