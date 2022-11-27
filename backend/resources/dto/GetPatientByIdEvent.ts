import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetPatientByIdEvent extends APIGatewayProxyEvent {
  pathParameters: {
    patient_id: number;
  }
};

export const validationSchema = yup.object({
  pathParameters: yup.object({
    patient_id: yup.number()
      .required()
  })
    .required()
});