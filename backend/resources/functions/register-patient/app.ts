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
import { PatientRegisterEvent, validationSchema } from "../../dto/PatientRegisterEvent";
import validator from "../../middlewares/validator";
import IPatientRepository from "../../repository/IPatientRepository";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: PatientRegisterEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    body: {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      gender,
      blood_type,
      weight,
      height,
      birth_date,
      story,
    }
  } = event;

  const patientRepository = await container.getAsync<IPatientRepository>(TYPES.PatientRepository);
  const existingPatient = await patientRepository.getByEmail(email);

  if (existingPatient) {
    return responseUtils.validationError([ ErrorConstants.EMAIL_ALREADY_TAKEN ]);
  }

  const savedPatient = await patientRepository.save(
    {
      first_name,
      last_name,
      email,
      password: hashSync(password),
      mobile_number,
      gender,
      blood_type,
      weight,
      height,
      birth_date,
      story,
    }
  );

  return responseUtils.success(savedPatient);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
