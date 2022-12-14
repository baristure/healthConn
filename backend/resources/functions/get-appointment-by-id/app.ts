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


const handler = async (event: GetAppointmentByIdEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const {
    pathParameters: {
      id
    }
  } = event;

  const appointmentRepository = await container.getAsync<IAppointmentRepository>(TYPES.AppointmentRepository);
  const responseUtils = await container.get<ResponseUtils>(TYPES.ResponseUtils);

  const appointment = await appointmentRepository.getById(parseInt(id));

  if (!appointment) {
    return responseUtils.notFound();
  }

  return responseUtils.success(appointment);
}

export const lambdaHandler = middy(handler)
  .use(cors())
  .use(httpErrorHandler())
  .use(validator(validationSchema));