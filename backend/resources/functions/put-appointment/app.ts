import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { Knex } from "knex";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/TYPES";
import { PutAppointmentEvent, validationSchema } from "../../dto/PutAppointmentEvent";
import validator from "../../middlewares/validator";
import ResponseUtils from "../../utils/ResponseUtils";
import _ from "lodash";
import cors from "../../middlewares/cors";

const handler = async (event: PutAppointmentEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const {
    pathParameters: {
      id: appointmentId
    },
    body: {
      recognization
    }
  } = event;

  const knex = await container.getAsync<Knex>(TYPES.Knex);
  const responseUtils = await container.get<ResponseUtils>(TYPES.ResponseUtils);

  const appointment = await knex.select("*")
    .from("appointments")
    .where({ id: appointmentId })
    .first();

  const {
    doctor_id: doctorId,
    patient_id: patientId,
    service_id: serviceId
  } = appointment;

  const doctor = await knex.select("*")
    .from("doctors")
    .where({ id: doctorId })
    .first();

  const patient = await knex.select("*")
    .from("patients")
    .where({ id: patientId })
    .first();

  const service = await knex.select("*")
    .from("services")
    .where({ id: serviceId })
    .first();

  const [ updatedAppointment ] = await knex("appointments")
    .update({
      recognization,
  })
  .where ({
    id: appointmentId
  })
  .returning("*");

  return responseUtils.success({
    doctor: _.omit(doctor, [ "password" ]),
    patient: _.omit(patient, [ "password" ]),
    service,
    ..._.omit(updatedAppointment, [ "patient_id", "doctor_id", "service_id" ]),
    complaints: updatedAppointment?.complaints ? JSON.parse(updatedAppointment.complaints) : null
  });
};

export const lambdaHandler = middy(handler)
  .use(cors())
  .use(jsonBodyParser())
  .use(validator(validationSchema))
  .use(httpErrorHandler())
