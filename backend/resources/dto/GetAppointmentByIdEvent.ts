import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetAppointmentByIdEvent extends APIGatewayProxyEvent {
  pathParameters: {
    id: string;
  }
}

export const validationSchema = yup.object({
  pathParameters: yup.object({
    id: yup.number()
      .required()
  }).required()
})