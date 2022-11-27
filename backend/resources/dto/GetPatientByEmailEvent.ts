import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface GetPatientByEmailEvent extends APIGatewayProxyEvent {
  pathParameters: {
    email: string;
  }
}

export const validationSchema = yup.object({
  pathParameters: yup.object({
    email: yup.string()
      .required()
  })
    .required()
});
