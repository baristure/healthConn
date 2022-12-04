import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { hashSync } from "bcryptjs";
import container from "../../config/inversify.config";
import { TYPES } from "../../config/TYPES";
import ErrorConstants from "../../constants/ErrorConstants";
import { DoctorRegisterEvent } from "../../dto/DoctorRegisterEvent";
import IDoctorRepository from "../../repository/IDoctorRepository";
import ResponseUtils from "../../utils/ResponseUtils";

export const handler = async (event: DoctorRegisterEvent): Promise<APIGatewayProxyStructuredResultV2> => {
  const responseUtils = container.get<ResponseUtils>(TYPES.ResponseUtils);

  const {
    body: {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      office_number,
      speciality,
      title,
      resume,
      image_url,
      gender,
      location,
    }
  } = event;

  const doctorRepository = await container.getAsync<IDoctorRepository>(TYPES.DoctorRepository);
  const existingDoctor = await doctorRepository.getByEmail(email);

  if (existingDoctor) {
    return responseUtils.validationError([ ErrorConstants.EMAIL_ALREADY_TAKEN ]);
  }

  const savedDoctor = await doctorRepository.save(
    {
      first_name,
      last_name,
      email,
      password: hashSync(password),
      mobile_number,
      office_number,
      speciality,
      title,
      resume,
      image_url,
      gender,
      location
    }
  );

  return responseUtils.success(savedDoctor);
};
  