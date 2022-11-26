import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetDoctorByIdEvent extends APIGatewayProxyEvent {
  queryStringParameters: {
    doctor_id: number;
  }
};

export const validationSchema = yup.object({
  queryStringParameters: yup.object({
    doctor_id: yup.number()
      .required()
  })
    .required()
});
