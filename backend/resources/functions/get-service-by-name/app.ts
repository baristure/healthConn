import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyStructuredResultV2
} from "aws-lambda";
import { GetServiceByNameEvent, validationSchema } from "../../dto/GetServiceByNameEvent";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import { IServiceRepository } from "../../repository/IServiceRepository";
import ResponseUtils from "../../utils/ResponseUtils";

const handler = async (event: GetServiceByNameEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    pathParameters: {
      serviceName
    }
  } = event;

  const serviceRepository = await container.getAsync<IServiceRepository>(TYPES.ServiceRepository);
  const service = await serviceRepository.getByName(serviceName);

  if (!service) {
    return responseUtils.notFound();
  }

  return responseUtils.success(service);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
  