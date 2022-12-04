import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyStructuredResultV2
} from "aws-lambda";
import { GetDoctorExtraDataEvent, validationSchema } from "../../dto/GetDoctorExtraDataEvent";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import IDoctorRepository from "../../repository/IDoctorRepository";
import IDoctorMembershipRepository from "../../repository/IDoctorMembershipRepository";
import ResponseUtils from "../../utils/ResponseUtils";
import { DoctorMembership } from "../../dto/DoctorMembership";

const handler = async (event: GetDoctorExtraDataEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    pathParameters: {
      doctorId
    }
  } = event;

  const doctorRepository = await container.getAsync<IDoctorRepository>(TYPES.DoctorRepository);
  const doctorMembershipRepository = await container.getAsync<IDoctorMembershipRepository>(TYPES.DoctorMembershipRepository);
  const doctor = await doctorRepository.getDoctorById(parseInt(doctorId));
  const doctorMemberships = await doctorMembershipRepository.filterByDoctorId(parseInt(doctorId));

  if (!doctor) {
    return responseUtils.notFound();
  }

  const memberships = doctorMemberships.reduce((acc: string[], doctorMembership: DoctorMembership) => {
    const { type, name } = doctorMembership;
    return type === 'Membership'
      ? [...acc, name]
      : acc;
  }, []);

  const publications = doctorMemberships.reduce((acc: string[], doctorMembership: DoctorMembership) => {
    const { type, name } = doctorMembership;
    return type === 'Publication'
      ? [...acc, name]
      : acc;
  }, []);

  const {
    first_name,
    last_name,
    resume,
    speciality,
    image_url,
  } = doctor;

  const doctorExtraData = {
    id: doctorId,
    first_name,
    last_name,
    resume,
    speciality,
    image_url,
    memberships,
    publications,
  };

  return responseUtils.success(doctorExtraData);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
  