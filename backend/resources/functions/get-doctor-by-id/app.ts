import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyStructuredResultV2
} from "aws-lambda";
import { GetDoctorByIdEvent, validationSchema } from "../../dto/GetDoctorByIdEvent";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import IDoctorRepository from "../../repository/IDoctorRepository";
import ResponseUtils from "../../utils/ResponseUtils";


const handler = async (event: GetDoctorByIdEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    pathParameters: {
      doctorId
    }
  } = event;

  const doctorRepository = await container.getAsync<IDoctorRepository>(TYPES.DoctorRepository);
  const doctor = await doctorRepository.getDoctorById(parseInt(doctorId));

  if (!doctor) {
    return responseUtils.notFound();
  }

  return responseUtils.success(doctor);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
  