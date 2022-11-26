import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetPatientByIdEvent extends APIGatewayProxyEvent {
  queryStringParameters: {
    patient_id: number;
  }
};

export const validationSchema = yup.object({
  queryStringParameters: yup.object({
    patient_id: yup.number()
      .required()
  })
    .required()
});