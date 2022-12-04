import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export type GetServicesEvent = APIGatewayProxyEvent; 

export const validationSchema = yup.object({
  pathParameters: yup.object({
    service_id: yup.string()
      .required()
  })
    .required()
});
