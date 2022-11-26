import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";
import { UserInput } from "../dto/RegisterEvent";

export interface UpdateUserEvent extends Omit<APIGatewayProxyEvent, "body"> {
  body: Partial<UserInput>
  pathParameters: {
    user_id: string;
  }
};

export const validationSchema = yup.object({
  body: yup.object({
    first_name: yup.string(),
    last_name: yup.string(),
    email: yup.string()
      .email(),
    password: yup.string(),
    mobile_number: yup.string(),
    type: yup.string(),
    image_url: yup.string(),
  }).required()
});
