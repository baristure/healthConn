import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetPatientByIdEvent extends APIGatewayProxyEvent {
  pathParameters: {
    patientId: string;
  }
};

export const validationSchema = yup.object({
  pathParameters: yup.object({
    patientId: yup.number()
      .required()
  })
    .required()
});
