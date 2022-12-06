import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/TYPES";
import { GetAppointmentByIdEvent, validationSchema } from "../../dto/GetAppointmentByIdEvent";
import cors from "../../middlewares/cors";
import validator from "../../middlewares/validator";
import { IAppointmentRepository } from "../../repository/IAppointmentRepository";
import ResponseUtils from "../../utils/ResponseUtils";
import { Knex } from "knex";
import _ from "lodash";
import IDoctorRepository from "../../repository/IDoctorRepository";


const handler = async (event: GetAppointmentByIdEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const {
    pathParameters: {
      id
    }
  } = event;

  const appointmentRepository = await container.getAsync<IAppointmentRepository>(TYPES.AppointmentRepository);
  const responseUtils = await container.get<ResponseUtils>(TYPES.ResponseUtils);
  const doctorRepository = await container.getAsync<IDoctorRepository>(TYPES.DoctorRepository);
  
  const appointment = await appointmentRepository.getById(parseInt(id));
  
  if (!appointment) {
    return responseUtils.notFound();
  }
  
  const knex = await container.getAsync<Knex>(TYPES.Knex);

  const doctor = await knex.select("*")
    .from("doctors")
    .where({ id: appointment.doctor_id })
    .first();

  const doctorsRating = await doctorRepository.getDoctorRating(appointment.doctor_id);
  doctor.rating = doctorsRating;

  const patient = await knex.select("*")
    .from("patients")
    .where({ id: appointment.patient_id })
    .first();

  const service = await knex.select("*")
    .from("services")
    .where({ id: appointment.service_id })
    .first();

  const review = await knex.select("*")
    .from("appointment_reviews")
    .where({ appointment_id: appointment.id })
    .first();

  return responseUtils.success({
    ..._.omit(appointment, [ "doctor_id", "patient_id", "service_id" ]),
    complaints: appointment?.complaints ? JSON.parse(appointment.complaints): null,
    doctor: _.omit(doctor, "password"),
    patient: _.omit(patient, "password"),
    service,
    review
  });
}

export const lambdaHandler = middy(handler)
  .use(cors())
  .use(httpErrorHandler())
  .use(validator(validationSchema));