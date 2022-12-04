import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetDoctorByIdEvent extends APIGatewayProxyEvent {
  pathParameters: {
    doctorId: string;
  }
};

export const validationSchema = yup.object({
  pathParameters: yup.object({
    doctorId: yup.number()
      .required()
  })
    .required()
});
