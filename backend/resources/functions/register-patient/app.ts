import {
  APIGatewayProxyStructuredResultV2
} from "aws-lambda";
import { hashSync } from "bcryptjs";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/types";
import ErrorConstants from "../../constants/ErrorConstants";
import { PatientRegisterEvent } from "../../dto/PatientRegisterEvent";
import IPatientRepository from "../../repository/IPatientRepository";
import ResponseUtils from "../../utils/ResponseUtils";

export const handler = async (event: PatientRegisterEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    body: {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      gender,
      blood_type,
      weight,
      height,
      birth_date,
      story,
    }
  } = event;

  const patientRepository = await container.getAsync<IPatientRepository>(TYPES.PatientRepository);
  let existingPatient = await patientRepository.getByEmail(email);

  if (existingPatient) {
    return responseUtils.validationError([ ErrorConstants.EMAIL_ALREADY_TAKEN ]);
  }

  existingPatient = await patientRepository.getByMobileNumber(mobile_number);

  if (existingPatient) {
    return responseUtils.validationError([ "Mobile number has already being used." ]);
  }

  const savedPatient = await patientRepository.save(
    {
      first_name,
      last_name,
      email,
      password: hashSync(password),
      mobile_number,
      gender,
      blood_type,
      weight,
      height,
      birth_date,
      story,
    }
  );

  return responseUtils.success(savedPatient);
};