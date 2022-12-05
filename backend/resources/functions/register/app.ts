import "reflect-metadata";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { DoctorRegisterEvent, validationSchema as doctorValidationSchema } from "../../dto/DoctorRegisterEvent";
import { UserType } from "../../dto/LoginEvent";
import { PatientRegisterEvent, validationSchema as patientValidationSchema } from "../../dto/PatientRegisterEvent";
import { handler as registerDoctorHandler } from "../register-doctor/app";
import { handler as registerPatientHandler } from "../register-patient/app";
import container from "../../config/inversify.config";
import ResponseUtils from "../../utils/ResponseUtils";
import { TYPES } from "../../config/TYPES";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import * as yup from "yup";
import cors from "../../middlewares/cors";

const handler = async (event: PatientRegisterEvent | DoctorRegisterEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const userType = event?.queryStringParameters?.user_type;

  if (!userType) {
    responseUtils.validationError([
      "user_type is a required query string parameter."
    ]);
  }

  let validationSchema: yup.ObjectSchema<any>;
  let handler;

  if (userType == UserType.DOCTOR) {
    validationSchema = doctorValidationSchema;
    handler = registerDoctorHandler;
  }

  if (userType == UserType.PATIENT) {
    validationSchema = patientValidationSchema;
    handler = registerPatientHandler;
  }

  if (!handler) {
    return responseUtils.validationError([
      "user_type should be one of the following values: " + Object.values(UserType)
    ])
  }

  try {
    validationSchema!.validateSync(event, { abortEarly: false })
  } catch ({ errors }) {
    return responseUtils.validationError(errors as string[]);
  };
  
  return await handler(event as PatientRegisterEvent & DoctorRegisterEvent);
}

export const lambdaHandler = middy(handler)
  .use(cors())
  .use(httpErrorHandler())
  .use(jsonBodyParser());