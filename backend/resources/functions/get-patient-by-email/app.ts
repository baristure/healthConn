import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { GetPatientByEmailEvent, validationSchema } from "../../dto/GetPatientByEmailEvent";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import IPatientRepository from "../../repository/IPatientRepository";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: GetPatientByEmailEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    queryStringParameters: {
      email
    }
  } = event;

  const patientRepository = await container.getAsync<IPatientRepository>(TYPES.PatientRepository);
  const patient = await patientRepository.getByEmail(email);

  if (!patient) {
    return responseUtils.notFound();
  }

  return responseUtils.success(patient);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(validator(validationSchema));