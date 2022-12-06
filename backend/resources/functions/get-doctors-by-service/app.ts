import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyStructuredResultV2
} from "aws-lambda";
import { GetDoctorsByServiceEvent, validationSchema } from "../../dto/GetDoctorsByServiceEvent";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import IDoctorRepository from "../../repository/IDoctorRepository";
import ResponseUtils from "../../utils/ResponseUtils";
import cors from "../../middlewares/cors";


const handler = async (event: GetDoctorsByServiceEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  let {
    pathParameters: {
      serviceName
    }
  } = event;

  serviceName = decodeURIComponent(serviceName);

  const doctorRepository = await container.getAsync<IDoctorRepository>(TYPES.DoctorRepository);
  const doctors = await doctorRepository.getDoctorsByService(serviceName);

  if (!doctors) {
    return responseUtils.notFound();
  }

  return responseUtils.success(doctors);
};

export const lambdaHandler = middy(handler)
  .use(cors())
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
  