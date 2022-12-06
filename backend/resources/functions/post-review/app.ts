import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { Knex } from "knex";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/TYPES";
import { Appointment } from "../../dto/Appointment";
import { PostReviewEvent, validationSchema } from "../../dto/PostReviewEvent";
import cors from "../../middlewares/cors";
import validator from "../../middlewares/validator";
import RequestUtils from "../../utils/RequestUtils";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: PostReviewEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const {
    body: {
      point,
      comment
    },
    pathParameters: {
      id
    }
  } = event;

  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);
  const knex = await container.getAsync<Knex>(TYPES.Knex);
  const requestUtils = container.get<RequestUtils>(TYPES.RequestUtils);

  const { id: patientId } = requestUtils.decodeJwt(event);

  const existingAppointment = await knex.select("*")
    .from("appointments")
    .where({ id })
    .first() as Appointment;


  if (!existingAppointment) {
    return responseUtils.validationError([
      `Appointment with id ${id} not found.`
    ]);
  }

  if (existingAppointment.patient_id !== patientId) {
    return responseUtils.unauthorized();
  }

  const [ savedReview ] = await knex.insert({
    appointment_id: id,
    point,
    comment
  })
  .into("appointment_reviews")
  .returning("*");

  return responseUtils.success(savedReview)
}

export const lambdaHandler = middy(handler)
  .use(cors())
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
