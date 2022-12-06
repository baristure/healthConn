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
import _ from "lodash";
import cors from "../../middlewares/cors";

const handler = async (event: GetDoctorExtraDataEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    pathParameters: {
      doctorId
    }
  } = event;

  const doctorRepository = await container.getAsync<IDoctorRepository>(TYPES.DoctorRepository);
  const doctorMembershipRepository = await container.getAsync<IDoctorMembershipRepository>(TYPES.DoctorMembershipRepository);
  const doctor = await doctorRepository.getById(parseInt(doctorId));
  const doctorMemberships = await doctorMembershipRepository.filterByDoctorId(parseInt(doctorId));

  if (!doctor) {
    return responseUtils.notFound();
  }

  const memberships = doctorMemberships.filter(membership => membership.type as string == "membership"); 
  const publications = doctorMemberships.filter(membership => membership.type as string == "publication");
  const rating = doctorRepository.getDoctorRating(doctor.id);

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
    rating
  };

  return responseUtils.success(doctorExtraData);
};

export const lambdaHandler = middy(handler)
  .use(cors())
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
  