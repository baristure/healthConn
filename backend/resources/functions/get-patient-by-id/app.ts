import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyStructuredResultV2
} from "aws-lambda";
import { GetPatientByIdEvent, validationSchema } from "../../dto/GetPatientByIdEvent";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import IPatientRepository from "../../repository/IPatientRepository";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: GetPatientByIdEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    pathParameters: {
      patientId
    }
  } = event;

  const patientRepository = await container.getAsync<IPatientRepository>(TYPES.PatientRepository);
  const patient = await patientRepository.getById(parseInt(patientId));

  if (!patient) {
    return responseUtils.notFound();
  }

  return responseUtils.success(patient);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
  