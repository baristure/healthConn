import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { GetUserByEmailEvent, validationSchema } from "../../dto/GetUserByEmail";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import IUserRepository from "../../repository/IUserRepository";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: GetUserByEmailEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    pathParameters: {
      email
    }
  } = event;

  const userRepository = await container.getAsync<IUserRepository>(TYPES.UserRepository);

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    return responseUtils.notFound();
  }

  return responseUtils.success(user);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(validator(validationSchema));