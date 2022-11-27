import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
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
      patient_id
    }
  } = event;

  const patientRepository = await container.getAsync<IPatientRepository>(TYPES.PatientRepository);

  const patient = await patientRepository.getUserById(patient_id);

  if (!patient) {
    return responseUtils.notFound();
  }

  return responseUtils.success(patient);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(validator(validationSchema));