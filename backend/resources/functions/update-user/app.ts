import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import IPatientRepository from "../../repository/IPatientRepository";
import ResponseUtils from "../../utils/ResponseUtils";
import { UpdateUserEvent, validationSchema } from "../../dto/UpdateUserEvent";
import cors from "../../middlewares/cors";

const handler = async (event: UpdateUserEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    body,
    pathParameters: {
      user_id
    }, 
  } = event;

  const patientRepository = await container.getAsync<IPatientRepository>(TYPES.PatientRepository);

  const user = await patientRepository.update(parseInt(user_id), body);

  if (!user) {
    return responseUtils.notFound();
  }

  return responseUtils.success(user);
};

export const lambdaHandler = middy(handler)
  .use(cors())
  .use(httpErrorHandler())
  .use(validator(validationSchema));
