import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { Knex } from "knex";
import _ from "lodash";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/TYPES";
import { GetAppointmentsEvent, validationSchema } from "../../dto/GetAppointmentsEvent";
import { UserType } from "../../dto/LoginEvent";
import validator from "../../middlewares/validator";
import ResponseUtils from "../../utils/ResponseUtils";

const mapAppointments = (rows: any[], knex: Knex) => Promise.all((rows as any[]).map(async row => {
  const patient = await knex.select("*")
    .from("patients")
    .where({ id: row.patient_id })
    .first();

  const doctor = await knex.select("*")
    .from("doctors")
    .where({ id: row.doctor_id })
    .first();

  const service = await knex.select("*")
    .from("services")
    .where({ id: row.service_id })
    .first();

  row = _.omit(row, [ "patient_id", "doctor_id", "service_id" ]);

  row.patient = _.omit(patient, "password");
  row.doctor = _.omit(doctor, "password");
  row.service = service;

  if (row.complaints) {
    row.complaints = JSON.parse(row.complaints);
  }

  return row;
}))

const handler = async (event: GetAppointmentsEvent): Promise<APIGatewayProxyStructuredResultV2> => {

  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);
  const knex = await container.getAsync<Knex>(TYPES.Knex);

  const {
    userId,
    userType,
    pageNumber,
    pageSize
  } = event.queryStringParameters;

  if (!userId) {
    const { rows } = await knex.raw(
      `
      select *
      from appointments a
      order by a.start_date asc
      limit ${parseInt(pageSize)}
      offset ${(parseInt(pageNumber) - 1) * parseInt(pageSize)}
      `
    );

    return responseUtils.success(await mapAppointments(rows, knex));
  }

  const { rows } = await knex.raw(
    `
    select *
    from appointments a
    where ${userType == UserType.DOCTOR ? "a.doctor_id" : "a.patient_id"} = ?
    limit ${parseInt(pageSize)}
    offset ${(parseInt(pageNumber) - 1) * parseInt(pageSize)}
    `,
    [ userId ]
  )

  return responseUtils.success(await mapAppointments(rows, knex));
}

export const lambdaHandler = middy(handler)
  .use(httpErrorHandler())
  .use(validator(validationSchema));