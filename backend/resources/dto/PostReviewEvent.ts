import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface PostReviewEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: {
    point: number;
    comment?: string;
  },
  pathParameters: {
    id: string;
  }
}

export const validationSchema = yup.object({
  body: yup.object({
    point: yup.number()
      .min(0)
      .max(10)
      .required(),
    comment: yup.string()
      .notRequired()
      .default(undefined)
  }).required(),
  pathParameters: yup.object({
    id: yup.number()
      .required()
  })
})