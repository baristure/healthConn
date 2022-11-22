import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

export interface PostInput {
  user_id: string;
  title: string;
  body: string;
}

export interface CreatePostEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: {
    title: string;
    body: string;
  }
  pathParameters: {
    user_id: string;
  }
}

export const validationSchema = yup.object({
  body: yup.object({
    title: yup.string()
      .required(),
    body: yup.string()
      .required()
  }).required(),
  pathParameters: yup.object(
    {
      user_id: yup.string()
        .required()
    }
  ).required()
});
