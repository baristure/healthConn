import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetPatientByEmailEvent extends APIGatewayProxyEvent {
  queryStringParameters: {
    email: string;
  }
};

export const validationSchema = yup.object({
  queryStringParameters: yup.object({
    email: yup.string()
      .required()
  })
    .required()
});
