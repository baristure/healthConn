import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface PutAppointmentEvent extends Omit<APIGatewayProxyEvent, "body"> {
  pathParameters: {
    id: string
  },
  body: {
    recognization?: string;
  } 
};

export const validationSchema = yup.object({
  pathParameters: yup.object({
    id: yup.number()
      .required()
  }).required(),
  body: yup.object({
    recognization: yup.string(),
  })
}).required();
