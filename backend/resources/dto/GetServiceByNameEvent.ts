import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";
import { Speciality } from "./Service";

export interface GetServiceByNameEvent extends APIGatewayProxyEvent {
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
