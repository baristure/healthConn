import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyStructuredResultV2
} from "aws-lambda";
import { GetServicesEvent, validationSchema } from "../../dto/GetServicesEvent";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import validator from "../../middlewares/validator";
import { IServiceRepository } from "../../repository/IServiceRepository";
import ResponseUtils from "../../utils/ResponseUtils";
import { Service } from "../../dto/Service";

const handler = async (event: GetServicesEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const serviceRepository = await container.getAsync<IServiceRepository>(TYPES.ServiceRepository);
  const services = await serviceRepository.getAll();

  if (!services) {
    return responseUtils.notFound();
  }

  const formattedServices = services.map((service: Service) => {
    const { id: service_id, name }: { id: number, name: string } = service;
    return { service_id, name };
  });

  return responseUtils.success(formattedServices);
};

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(jsonBodyParser())
  .use(validator(validationSchema));
  