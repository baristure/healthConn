import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { bodyPartExplanations } from "../../constants/bodyPartExplanations";

export const Confirmation = ({ doctor }) => {
  const { selectedDate, bodyParts } = useSelector((state) => state.appointment);
  const doctorTitle = "Prof. Dr.";
  const getBodyPartExplanation = (bodyPart) => {
    return bodyPartExplanations[bodyPart];
  };

  return (
    <div>
      <div className="p-4 mt-3 w-full">
        <div className="w-full flex flex-col justify-center items-center w-full">
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
                                {" " + doctor.speciality}
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
                              Doctor Detail:
                              <span className="text-gray-700">
                                {" "}
                                {doctorTitle +
                                  " " +
                                  doctor.first_name +
                                  " " +
                                  doctor.last_name}
                              </span>
                            </p>
                          </div>
                          <div className="mt-1 flex text-base w-full">
                            <p className="font-semibold">
                              Appointment Date:
                              {(selectedDate instanceof Date ||
                                selectedDate) && (
                                <span className="text-gray-700">
                                  {" " +
                                    format(
                                      Date.parse(selectedDate),
                                      "MM/dd/yyyy HH:mm"
                                    )}
                                </span>
                              )}
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
          <div className="mx-auto max-w-2xl px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8  w-full">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
              Complaints Summary
            </h1>
            <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <div className="lg:col-span-2"></div>
              <section className="lg:col-span-8 w-full">
                <ul className="divide-y divide-gray-200 border-t border-gray-200 w-full">
                  {Object.keys(bodyParts).map((key, index) => {
                    if (bodyParts[key].selected)
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
                                  {" " + getBodyPartExplanation(key)}
                                </div>
                                <div className="mt-1 flex text-base w-full">
                                  <p className="font-semibold">Pain level: </p>

                                  {bodyParts[key].painLevel <= 0.5
                                    ? ` ${bodyParts[key].painLevel} | No pain`
                                    : bodyParts[key].painLevel <= 3
                                    ? ` ${bodyParts[key].painLevel} | Mild`
                                    : bodyParts[key].painLevel <= 6
                                    ? ` ${bodyParts[key].painLevel} | Moderate`
                                    : bodyParts[key].painLevel <= 9
                                    ? ` ${bodyParts[key].painLevel} | Severe`
                                    : ` ${bodyParts[key].painLevel} | Very severe`}
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
                              <span className="w-full">
                                {bodyParts[key].comment}
                              </span>
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
        </div>
      </div>
    </div>
  );
};
