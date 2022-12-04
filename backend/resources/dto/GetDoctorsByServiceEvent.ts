import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetDoctorsByServiceEvent extends APIGatewayProxyEvent {
  pathParameters: {
    serviceName: string;
  }
};

export const validationSchema = yup.object({
  pathParameters: yup.object({
    serviceName: yup.string()
      .required()
  })
    .required()
});
