import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Form, Formik } from "formik";

import {
  Input,
  FormObserver,
  Button,
  FormRadioButton,
  Loading,
  Card,
} from "../common/Elements";
import { Booking } from "./Booking";
import { Complaints } from "./Complaints/Complaints";
import { Confirmation } from "./Confirmation";

import {
  handleProgress,
  clearState,
  submitAppointment,
} from "./appointmentSlice";
import { format } from "date-fns";

export const Appointment = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.appointment);
  const progress = state.progress;
  useEffect(() => {
    // dispatch(clearState());
  }, []);

  const onSubmit = () => {
    const submitAppointmentForm = {
      date: format(Date.parse(state.selectedDate), "dd/MM/yyyy HH:mm"),
      compaints: {},
      userId: state.userId,
      doctorId: state.doctorId,
      serviceId: state.serviceId,
    };
    Object.keys(state.bodyParts).map((key) => {
      if (state.bodyParts[key].selected) {
        submitAppointmentForm.compaints[key] = {
          side: state.bodyParts[key].side,
          painLevel: state.bodyParts[key].painLevel,
          comment: state.bodyParts[key].comment,
        };
      }
    });
    // console.log({ submitAppointmentForm });
    dispatch(submitAppointment(submitAppointmentForm));
  };

  const GetProgressInformation = () => {
    if (progress === 1) return <Booking />;
    if (progress === 2) return <Complaints />;
    if (progress === 3) return <Confirmation />;
  };
  if (state.isFetching)
    return (
      <div>
        <Loading />
      </div>
    );
  if (state.isSuccess)
    return (
      <div className="flex-1 w-full border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="flex flex-col justify-center align-center min-h-screen pb-48">
          <Card
            icon="FaCheckCircle"
            title="Appointment created successfully"
            description={
              "Please be ready approximately 15 minutes before than the appointment."
            }
          >
            <div className="lg:space-y-0 space-y-2 lg:space-x-2 space-x-0 flex lg:flex-row flex-col items-center justify-center w-full mt-4">
              <Button size="md" color="gray" hover="gray" className="w-full">
                Dashboard
              </Button>
              <Button
                size="md"
                color="primary"
                hover="primary"
                className="w-full"
              >
                Appointments
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  return (
    <div className="flex-1 w-full border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="bg-white rounded-md p-3 ">
        <div className="w-full mx-auto my-4 border-b-2 pb-4">
          <div className="flex pb-3">
            <div className="flex-1"></div>
            {/* First Circle */}
            <div className="flex-1">
              <div className="w-10 h-10 bg-success mx-auto rounded-full text-lg text-white flex items-center">
                <span className="text-white text-center w-full">
                  <i className="fa fa-check w-full fill-current white"></i>
                </span>
              </div>
              <div className="text-xs text-center mt-1">Booking</div>
            </div>
            {/* First Line */}
            <div className="w-1/6 align-center items-center align-middle content-center flex pb-3">
              <div
                className={` w-full rounded items-center align-middle align-center flex-1 ${
                  progress >= 2 ? "bg-success" : "bg-contrast-50"
                }`}
              >
                <div
                  className={`text-xs leading-none py-1 text-center text-grey-darkest rounded w-full ${
                    progress >= 2 ? "bg-success-50" : "bg-contrast-50"
                  }`}
                ></div>
              </div>
            </div>

            {/* Second Circle */}
            <div className="flex-1">
              <div
                className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center ${
                  progress >= 2
                    ? "bg-success"
                    : "bg-white border-2 border-contrast-50"
                }`}
              >
                <span className="text-contrast-50 text-center w-full">
                  <i className="fa fa-check w-full fill-current white"></i>
                </span>
              </div>
              <div className="text-xs text-center mt-1">Complaints</div>
            </div>

            {/* Second Line */}
            <div className="w-1/6 align-center items-center align-middle content-center flex pb-3">
              <div
                className={` w-full rounded items-center align-middle align-center flex-1 ${
                  progress >= 3 ? "bg-success" : "bg-contrast-50"
                }`}
              >
                <div
                  className={`text-xs leading-none py-1 text-center text-grey-darkest rounded w-full ${
                    progress >= 3 ? "bg-success-50" : "bg-contrast-50"
                  }`}
                ></div>
              </div>
            </div>

            {/* Third Circle */}

            <div className="flex-1">
              <div
                className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center ${
                  progress >= 3
                    ? "bg-success"
                    : "bg-white border-2 border-contrast-50"
                }`}
              >
                <span className="text-contrast-50 text-center w-full"></span>
              </div>
              <div className="text-xs text-center mt-1">Confirmation</div>
            </div>

            <div className="flex-1"></div>
          </div>
        </div>

        {GetProgressInformation()}

        <div className="mb-5 flex justify-end align-center mr-2 mt-2">
          {progress > 1 && (
            <Button
              type="button"
              size="md"
              color="primary"
              callback={() => dispatch(handleProgress(progress - 1))}
              className="mr-2 w-20"
            >
              Back
            </Button>
          )}
          {progress === 1 && (
            <Button
              type="button"
              size="md"
              color="success"
              disabled={!state.selectedDate}
              callback={() => dispatch(handleProgress(progress + 1))}
              className="mr-2 w-20"
            >
              Next
            </Button>
          )}
          {progress === 2 && (
            <Button
              type="button"
              size="md"
              color="success"
              disabled={Object.keys(state.bodyParts).length <= 0}
              callback={() => dispatch(handleProgress(progress + 1))}
              className="mr-2 w-20"
            >
              Next
            </Button>
          )}
          {progress === 3 && (
            <Button
              type="button"
              size="md"
              color="success"
              className="mr-2 w-20"
              callback={() => onSubmit()}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
