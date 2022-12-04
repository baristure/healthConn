import { toast } from "react-toastify";
import { faker } from "@faker-js/faker";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { Button, Loading } from "../common/Elements";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import appointmentAPI from "../../common/api/Appointment";

export const Dashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const getAppointments = async () => {
    setLoading(true);
    const { data } = await appointmentAPI
      .getAll()
      .finally(() => setLoading(false));
    setAppointments(data);
  };
  useEffect(() => {
    getAppointments();
  }, []);

  const bmi =
    user.weight &&
    user.height &&
    (user.weight / ((user.height / 100) * (user.height / 100))).toFixed(2);

  const getBMIValue = (val) => {
    return val < 18.5
      ? t("underweight")
      : val >= 18.5 && val <= 24.9
      ? t("healty.weight")
      : val >= 25 && val <= 29.9
      ? t("overweight")
      : t("obesity");
  };

  const textColor = (val) => {
    return val < 18.5
      ? "text-blue-600"
      : val >= 18.5 && val <= 24.9
      ? "text-green-600"
      : val >= 25 && val <= 29.9
      ? "text-yellow-600"
      : "text-red-600";
  };

  return (
    <>
      <main className="flex-1">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 flex flex-row flex-wrap items-center justify-between sm:px-6 lg:px-8">
          <span className="text-2xl font-medium leading-6 text-contrast-90 sm:truncate ">
            {t("welcome")} {user.first_name + " " + user.last_name}
          </span>
        </div>
        {user.user_type === "patient" && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3 mt-6 sm:px-6 lg:px-8 px-4">
            <div className="relative rounded-md col-span-2 bg-white px-6 py-5 shadow-md flex items-center">
              <div className="col-span-2 w-full">
                <div className="flex flex-col">
                  <div className="text-lg font-medium text-contrast-90">
                    <h2 className="text-center font-bold pl-6 pb-2">
                      BMI {t("chart")}
                    </h2>
                    <img src="/images/bmi-chart.png" alt="bmichart" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex shadow-md rounded-md bg-white py-6 justify-center w-full p-5">
              <div className="space-y-2">
                <h2 className="text-center font-bold">{t("your.summary")}</h2>
                {user.gender && (
                  <div className="text-left">
                    <span className="font-bold">{t("gender")}:</span>{" "}
                    <span className="pl-2">
                      {user.gender === "male" ? t("male") : t("female")}
                    </span>
                  </div>
                )}
                {user.age && (
                  <div className="text-left">
                    <span className="font-bold">{t("age")}:</span>{" "}
                    <span className="pl-2">{user.age}</span>
                  </div>
                )}
                {user.weight && (
                  <div className="text-left">
                    <span className="font-bold">{t("weight")}:</span>{" "}
                    <span className="pl-2">{user.weight} kg</span>
                  </div>
                )}
                {user.height && (
                  <div className="text-left">
                    <span className="font-bold">{t("height")}:</span>{" "}
                    <span className="pl-2">{user.height} cm</span>
                  </div>
                )}
                {user.blood_type && (
                  <div className="text-left">
                    <span className="font-bold">{t("blood.type")}:</span>{" "}
                    <span className="pl-2">{user.blood_type}</span>
                  </div>
                )}
                <div className="text-left">
                  <span className="font-bold">BMI:</span>{" "}
                  <span className={`pl-2 ${textColor(bmi)}`}>
                    {bmi + " "} {getBMIValue(bmi)}
                  </span>
                </div>
                <div className="text-left">
                  <ul className="list-none">
                    <li className="text-blue-600">
                      {t("underweight.explain")}
                    </li>
                    <li className="text-green-600">{t("healty.explain")}</li>
                    <li className="text-yellow-600">
                      {t("overweight.explain")}
                    </li>
                    <li className="text-red-600">{t("obesity.explain")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col">
          <div className="m-4 p-4 bg-white shadow-md overflow-x-auto  overflow-y-auto">
            <div className="inline-block min-w-full py-2 align-middle md:px-4 lg:px-6">
              <div className=" ">
                <h1 className="text-center text-2xl py-6 mb-2 font-semibold">
                  {t("appointments")}
                </h1>
                <table className="min-w-full divide-y divide-gray-300 border">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 text-left"
                      >
                        {t("service.name")}
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900 text-left"
                      >
                        {user.user_type === "doctor"
                          ? t("patient.name")
                          : t("doctor.name")}
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6 text-center"
                      >
                        {t("date")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="text-center">
                          <Loading />
                        </td>
                      </tr>
                    ) : appointments && appointments.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center">
                          <div className="w-full text-center m-4 p-4">
                            <div className="min-w-full py-2 align-middle md:px-2 lg:px-2">
                              <div className="text-center font-semibold py-48 sm:py-16 md:py-24">
                                {t("no.appointment.found")}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      appointments &&
                      appointments.map((appointment) => (
                        <tr
                          key={appointment.id}
                          className="divide-x divide-gray-200"
                        >
                          <td className="whitespace-nowrap p-4 text-sm text-contrast-90 sm:pl-6 text-left">
                            {appointment.service}
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm text-contrast-90  text-left">
                            {user.user_type === "doctor"
                              ? appointment.patient
                              : appointment.doctor}
                          </td>

                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-contrast-90 sm:pr-6 text-left w-20">
                            {format(
                              Date.parse(appointment.date),
                              "dd MMMM yyy - HH:mm"
                            )}
                          </td>
                          <td className="whitespace-nowrap text-sm text-contrast-90 text-center">
                            <Button color="primary" hover="primary" size="xs">
                              <NavLink to={`/appointments/${appointment.id}`}>
                                {t("detail")}
                              </NavLink>
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
