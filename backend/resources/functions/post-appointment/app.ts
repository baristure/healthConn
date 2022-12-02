import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { Knex } from "knex";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/TYPES";
import { PostAppointmentEvent, validationSchema } from "../../dto/PostAppointmentEvent";
import validator from "../../middlewares/validator";
import ResponseUtils from "../../utils/ResponseUtils";


const handler = async (event: PostAppointmentEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const {
    body: {
      userId: patient_id,
      doctorId: doctor_id,
      complaints,
      date,
      recognization
    }
  } = event;

  const knex = await container.getAsync<Knex>(TYPES.Knex);
  const responseUtils = await container.get<ResponseUtils>(TYPES.ResponseUtils);

  const savedAppointment = await knex.insert({
    patient_id,
    doctor_id,
    recognization,
    date,
    complaints: JSON.stringify(complaints),
  })
  .into("appointments")
  .returning("*");

  return responseUtils.success(savedAppointment);
};

export const lambdaHandler = middy(handler)
  .use(validator(validationSchema))
  .use(httpErrorHandler())
