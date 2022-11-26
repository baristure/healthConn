import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyStructuredResultV2
} from "aws-lambda";
import { hashSync } from "bcryptjs";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import ErrorConstants from "../../constants/ErrorConstants";
import { RegisterEvent, validationSchema } from "../../dto/RegisterEvent";
import validator from "../../middlewares/validator";
import IUserRepository from "../../repository/IUserRepository";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: RegisterEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    body: {
      first_name,
      last_name,
      email,
      password,
    }
  } = event;

  const userRepository = await container.getAsync<IUserRepository>(TYPES.UserRepository);

  const existingUser = await userRepository.getUserByEmail(email);

  if (existingUser) {
    return responseUtils.validationError([ ErrorConstants.EMAIL_ALREADY_TAKEN ]);
  }

  const savedUser = await userRepository.save(
    {
      first_name,
      last_name,
      email,
      password: hashSync(password)
    }
  );

  return responseUtils.success(savedUser);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
