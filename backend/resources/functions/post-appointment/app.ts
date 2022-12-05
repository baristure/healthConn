import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { Knex } from "knex";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/TYPES";
import { PostAppointmentEvent, validationSchema } from "../../dto/PostAppointmentEvent";
import validator from "../../middlewares/validator";
import ResponseUtils from "../../utils/ResponseUtils";
import _ from "lodash";
import moment from "moment";
import cors from "../../middlewares/cors";

const handler = async (event: PostAppointmentEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const {
    body: {
      userId: patient_id,
      doctorId: doctor_id,
      serviceId: service_id,
      complaints,
      date,
      recognization
    }
  } = event;

  const knex = await container.getAsync<Knex>(TYPES.Knex);
  const responseUtils = await container.get<ResponseUtils>(TYPES.ResponseUtils);

  const existingDoctor = await knex.select("*")
    .from("doctors")
    .where({ id: doctor_id })
    .first();

  if (!existingDoctor) {
    return responseUtils.validationError([`Doctor with id ${doctor_id} not found.`]);
  }

  const existingPatient = await knex.select("*")
    .from("patients")
    .where({ id: patient_id })
    .first();

  if (!existingPatient) {
    return responseUtils.validationError([`Patient with id ${patient_id} not found`]);
  }

  const existingService = await knex.select("*")
    .from("services")
    .where({ id: service_id })
    .first();

  if (!existingService) {
    return responseUtils.validationError([`Service with id ${service_id} not found.`]);
  }

  const [ savedAppointment ] = await knex.insert({
    patient_id,
    doctor_id,
    service_id,
    recognization,
    start_date: moment(date).toDate(),
    end_date: moment(date).add("minutes", 30).toDate(),
    complaints: JSON.stringify(complaints),
  })
  .into("appointments")
  .returning("*");

  return responseUtils.success({
    doctor: _.omit(existingDoctor, [ "password" ]),
    patient: _.omit(existingPatient, [ "password" ]),
    ..._.omit(savedAppointment, [ "patient_id", "doctor_id", "service_id" ]),
    complaints: savedAppointment?.complaints ? JSON.parse(savedAppointment.complaints) : null
  });
};

export const lambdaHandler = middy(handler)
  .use(cors())
  .use(jsonBodyParser())
  .use(validator(validationSchema))
  .use(httpErrorHandler())
