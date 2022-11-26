import { APIGatewayProxyEvent } from "aws-lambda";
import * as yup from "yup";

<<<<<<<< HEAD:backend/resources/dto/GetPatientByEmailEvent.ts
export interface GetPatientByEmailEvent extends APIGatewayProxyEvent {
  pathParameters: {
    email: string;
========
export interface GetDoctorByIdEvent extends APIGatewayProxyEvent {
  pathParameters: {
    doctor_id: string;
>>>>>>>> 14db9af (doctor entity and related functions update):backend/resources/dto/GetDoctorByidEvent.ts
  }
}

export const validationSchema = yup.object({
  pathParameters: yup.object({
<<<<<<<< HEAD:backend/resources/dto/GetPatientByEmailEvent.ts
    email: yup.string()
========
    doctor_id: yup.string()
>>>>>>>> 14db9af (doctor entity and related functions update):backend/resources/dto/GetDoctorByidEvent.ts
      .required()
  })
    .required()
});
