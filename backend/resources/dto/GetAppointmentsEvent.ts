import { APIGatewayProxyEvent } from "aws-lambda";
import { UserType } from "./LoginEvent";
import * as yup from "yup";

export interface GetAppointmentsEvent extends APIGatewayProxyEvent {
  queryStringParameters: {
    userId?: string;
    userType?: UserType;
    pageSize: string;
    pageNumber: string;
  }
}

export const validationSchema = yup.object({
  queryStringParameters: yup.object({
    userId: yup.string(),
    userType: yup.string()
      .when("userId", (userId: string) => {
        if (userId) {
          return yup.string()
            .required();
        }
        return yup.string()
      }),
    pageSize: yup.number()
      .positive()
      .required(),
    pageNumber: yup.number()
      .positive()
      .required()
  })
    .notRequired()
    .default(undefined)
})