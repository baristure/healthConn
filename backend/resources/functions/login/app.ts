import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import _ from "lodash";
import "reflect-metadata";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import { Doctor } from "../../dto/Doctor";
import { LoginEvent, validationSchema } from "../../dto/LoginEvent";
import { Patient } from "../../dto/Patient";
import { UserRepositoryFactory } from "../../factory/UserRepositoryFactory";
import validator from "../../middlewares/validator";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: LoginEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    body: {
      email,
      password
    },
    queryStringParameters: {
      user_type
    }
  } = event;

  const userRepositoryFactory = await container.getAsync<UserRepositoryFactory>(TYPES.UserRepositoryFactory);
  const userRepository = userRepositoryFactory.getRepository(user_type);
  const existingUser = await userRepository.getByEmail(email);

  if (!existingUser) {
    return responseUtils.unauthorized();
  }

  const {
    id,
    password: hashedPassword
  } = existingUser;

  if (!compareSync(password, hashedPassword)) {
    return responseUtils.unauthorized();
  }

  const jwt = sign(
    {
      ..._.omit(existingUser, [ "id", "password" ]),
      user_type
    },
    process.env.SECRET_KEY!
  );

  return responseUtils.success(jwt);
}

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
