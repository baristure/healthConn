import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { format } from "date-fns";
import { bodyPartExplanations } from "../../constants/bodyPartExplanations";
import http from "../../common/api/Axios.config";
import { Loading } from "../common/Elements";
import { AppointmentDetailReview } from "./review/AppointmentDetailReview";
import { useDispatch } from "react-redux";
import {
  clearDoctorNoteState,
  clearPatientReviewState,
  setDoctorNote,
  setPatientReview,
} from "./review/appointmentReviewSlice";
import { useTranslation } from "react-i18next";

export const AppointmentDetail = ({ user }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { appointmentId } = useParams();
  const dispatch = useDispatch();
  const fetchAppointmentDetail = async () => {
    setLoading(true);
    const response = await http
      .get(`/appointment-detail-data?appointment=${appointmentId}`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    setData(response);
  };

  const onDoctorNoteSet = async (doctorNote) => {
    dispatch(setDoctorNote({ id: appointmentId, doctorNote }));
  };
  const onRatingSet = async (rating) => {
    dispatch(setPatientReview({ id: appointmentId, rating }));
  };

  useEffect(() => {
    fetchAppointmentDetail();
    dispatch(clearDoctorNoteState());
    dispatch(clearPatientReviewState());
  }, []);

  const getBodyPartExplanation = (bodyPart) => {
    return bodyPartExplanations[bodyPart];
  };
  if (!data) return <div>Hello</div>;
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="p-4 mt-3 w-full">
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold py-2">Appointment Details</h2>
          <div className="mx-auto max-w-2xl px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8 pb-8 w-full">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
              Service Summary
            </h1>
            <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <div className="lg:col-span-2"></div>
              <section className="lg:col-span-8">
                <ul className="divide-y divide-gray-200 border-t border-gray-200">
                  <li className="flex py-4 sm:py-10">
                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid  sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="mt-1 flex text-base w-full">
                            <p className="font-semibold">
                              Service Name:
                              <span className="text-gray-700">
                                {" " + data.service.name}
                              </span>
                            </p>
                          </div>
                          <div className="mt-1 flex text-base w-full">
                            <p className="font-semibold">
                              Location:
                              <span className="text-gray-700">
                                {" Floor 2, Room 9"}
                              </span>
                            </p>
                          </div>
                          <div className="mt-1 flex text-base w-full">
                            <p className="font-semibold">
                              {user.user_type === "patient" && "Doctor Detail:"}
                              <span className="text-gray-700">
                                {user.user_type === "patient" &&
                                  data.doctor.title +
                                    " " +
                                    data.doctor.first_name +
                                    " " +
                                    data.doctor.last_name}
                              </span>
                            </p>
                          </div>
                          <div className="mt-1 flex text-base w-full">
                            <p className="font-semibold">
                              Appointment Date:
                              <span className="text-gray-700">
                                {" " +
                                  format(
                                    Date.parse(data.date),
                                    "MM/dd/yyyy HH:mm"
                                  )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              <div className="lg:col-span-2"></div>
            </div>
          </div>
          {user.user_type === "doctor" && (
            <div className="mx-auto max-w-2xl px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8 pb-8 w-full">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
                Patient Details
              </h1>
              <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <div className="lg:col-span-2"></div>
                <section className="lg:col-span-8">
                  <ul className="divide-y divide-gray-200 border-t border-gray-200">
                    <li className="flex py-4 sm:py-10">
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid  sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="mt-1 flex text-base w-full">
                              <p className="font-semibold">
                                Patient Detail:
                                <span className="text-gray-700">
                                  {" " +
                                    data.user.first_name +
                                    " " +
                                    data.user.last_name}
                                </span>
                              </p>
                            </div>
                            <div className="mt-1 flex text-base w-full">
                              <p className="font-semibold">
                                Gender:
                                <span className="text-gray-700">
                                  {" " + data.user.gender}
                                </span>
                              </p>
                            </div>
                            <div className="mt-1 flex text-base w-full">
                              <p className="font-semibold">
                                Blood Type:
                                <span className="text-gray-700">
                                  {" " + data.user.blood_type}
                                </span>
                              </p>
                            </div>
                            <div className="mt-1 flex text-base w-full">
                              <p className="font-semibold">
                                Weight:
                                <span className="text-gray-700">
                                  {" " + data.user.weight + " kg"}
                                </span>
                              </p>
                            </div>
                            <div className="mt-1 flex text-base w-full">
                              <p className="font-semibold">
                                Height:
                                <span className="text-gray-700">
                                  {" " + data.user.height + " meter"}
                                </span>
                              </p>
                            </div>
                            <div className="mt-1 flex text-base w-full">
                              <p className="font-semibold">
                                Story:
                                <span className="text-gray-700">
                                  {" " + data.user.story}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </section>
                <div className="lg:col-span-2"></div>
              </div>
            </div>
          )}
          <div className="mx-auto max-w-2xl px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8  w-full">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
              Complaints Summary
            </h1>
            <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <div className="lg:col-span-2"></div>
              <section className="lg:col-span-8 w-full">
                <ul className="divide-y divide-gray-200 border-t border-gray-200 w-full">
                  {data.complaints.map((complaint, index) => {
                    return (
                      <li
                        key={"part-" + index}
                        className="flex py-4 sm:py-10 w-full"
                      >
                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6 w-full">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0 w-full">
                            <div>
                              <div className="mt-1 flex text-base w-full">
                                <p className="font-semibold">Body Part: </p>
                                {getBodyPartExplanation(complaint.part) +
                                  " | " +
                                  complaint.side}
                              </div>
                              <div className="mt-1 flex text-base w-full">
                                <p className="font-semibold">Pain level: </p>
                                {complaint.severity <= 0.5
                                  ? ` ${complaint.severity} | No pain`
                                  : complaint.severity <= 3
                                  ? ` ${complaint.severity} | Mild`
                                  : complaint.severity <= 6
                                  ? ` ${complaint.severity} | Moderate`
                                  : complaint.severity <= 9
                                  ? ` ${complaint.severity} | Severe`
                                  : ` ${complaint.severity} | Very severe`}
                              </div>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:pr-9">
                              <div className="absolute top-0 right-0">
                                <button
                                  type="button"
                                  className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                >
                                  {/* <span className="sr-only">Remove</span> */}
                                  {/* <Icon className="h-5 w-5" aria-hidden="true" /> */}
                                </button>
                              </div>
                            </div>
                          </div>

                          <p className="mt-4 flex space-x-2 text-sm text-left text-gray-700">
                            <span className="w-full">{complaint.comment}</span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
              <div className="lg:col-span-2"></div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <AppointmentDetailReview
              date={data.date}
              rating={data.rating}
              userType={user.user_type}
              doctorNote={data.doctorNote}
              onDoctorNoteSet={onDoctorNoteSet}
              onRatingSet={onRatingSet}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
