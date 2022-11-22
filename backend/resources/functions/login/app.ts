import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import JwtPayload from "../../dto/JwtPayload";
import { LoginEvent, validationSchema } from "../../dto/LoginEvent";
import { User } from "../../dto/User";
import validator from "../../middlewares/validator";
import IUserRepository from "../../repository/IUserRepository";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: LoginEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    body: {
      email,
      password
    }
  } = event;

  const userRepository = await container.getAsync<IUserRepository>(TYPES.UserRepository);

  const existingUser = await userRepository.getUserByEmail(email);

  if (!existingUser) {
    return responseUtils.unauthorized();
  }

  const {
    id,
    password: hashedPassword
  } = existingUser as User;

  if (!compareSync(password, hashedPassword)) {
    return responseUtils.unauthorized();
  }

  const jwt = sign(
    {
      user_id: id,
      email
    } as JwtPayload,
    process.env.SECRET_KEY!
  );

  return responseUtils.success(jwt);
}

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
