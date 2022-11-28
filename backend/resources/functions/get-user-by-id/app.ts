import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { GetUserByIdEvent, validationSchema } from "../../dto/GetDoctorByidEvent";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import IUserRepository from "../../repository/IUserRepository";
import ResponseUtils from "../../utils/ResponseUtils";


const handler = async (event: GetUserByIdEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    pathParameters: {
      user_id
    }
  } = event;

  const userRepository = await container.getAsync<IUserRepository>(TYPES.UserRepository);

  const user = await userRepository.getUserById(user_id);

  if (!user) {
    return responseUtils.notFound();
  }

  return responseUtils.success(user);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(validator(validationSchema));