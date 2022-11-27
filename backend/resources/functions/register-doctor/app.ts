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
import { DoctorRegisterEvent, validationSchema } from "../../dto/DoctorRegisterEvent";
import validator from "../../middlewares/validator";
import IDoctorRepository from "../../repository/IDoctorRepository";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: DoctorRegisterEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    body: {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      office_number,
      speciality,
      title,
      resume,
      image_url,
      gender,
      rating,
    }
  } = event;

  const doctorRepository = await container.getAsync<IDoctorRepository>(TYPES.DoctorRepository);
  const existingDoctor = await doctorRepository.getDoctorByEmail(email);

  if (existingDoctor) {
    return responseUtils.validationError([ ErrorConstants.EMAIL_ALREADY_TAKEN ]);
  }

  const savedDoctor = await doctorRepository.save(
    {
      first_name,
      last_name,
      email,
      password: hashSync(password),
      mobile_number,
      office_number,
      speciality,
      title,
      resume,
      image_url,
      gender,
      rating,
    }
  );

  return responseUtils.success(savedDoctor);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));