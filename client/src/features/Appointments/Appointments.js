import { useState, useEffect } from "react";
import { format } from "date-fns";

import { Button, Loading, Pagination, SelectBox } from "../common/Elements";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import appointmentAPI from "../../common/api/Appointment";
export const Appointments = ({ user }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const options = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 25,
      label: "25",
    },
    {
      value: 50,
      label: "50",
    },
  ];
  const getAppointments = async () => {
    setLoading(true);
    const res = await appointmentAPI
      .getAll({ pageNumber: 1, pageSize: 10 }) // TODO endpoint have to be change
      .then((res) => res.data)
      .catch((err) => console.log(err))
      .finally(
        () =>
          setTimeout(() => {
            setLoading(false);
          }, 2000) // TODO Delete set timeout
      );
    setAppointments(res);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        <div className="m-4 p-4 bg-white shadow-md overflow-x-auto  overflow-y-auto">
          <div className="inline-block min-w-full py-2 align-middle md:px-4 lg:px-6">
            <div className=" ">
              <h1 className="text-center text-2xl py-6 mb-2 font-semibold">
                {t("Appointment List")}
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
                      {t("Date")}
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
                              {t("noAppointment")}
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
                          {appointment.service.name}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-contrast-90  text-left">
                          {user.user_type === "doctor"
                            ? appointment.patient.first_name +
                              " " +
                              appointment.patient.last_name
                            : appointment.doctor.title +
                              " " +
                              appointment.doctor.first_name +
                              " " +
                              appointment.doctor.last_name}
                        </td>

                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-contrast-90 sm:pr-6 text-left w-20">
                          {format(
                            Date.parse(appointment.start_date),
                            "dd MMMM yyy - HH:mm"
                          )}
                        </td>
                        <td className="whitespace-nowrap text-sm text-contrast-90 text-center">
                          <NavLink to={`/appointments/${appointment.id}`}>
                            <Button color="primary" hover="primary" size="xs">
                              {t("detail")}
                            </Button>
                          </NavLink>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {appointments && (
                <div className="flex flex-row justify-between align-middle px-2 mt-2">
                  <div className="flex flex-row justify-start items-center">
                    <div className="flex flex-row justify-start items-center text-contrast-70 mr-6 text-sm">
                      <span className="mr-2 text-sm">{t("show.records")}</span>
                      <SelectBox
                        options={options}
                        name="sendType"
                        placement="top"
                        placeholder={10}
                        onChange={(val) => console.log(val)}
                      />
                    </div>
                    <Pagination
                      className="pagination-bar"
                      currentPage={1}
                      totalCount={20}
                      pageSize={10}
                      onPageChange={(val) => console.log(val)}
                    />
                  </div>
                  <div className="flex items-center text-contrast-70 text-sm">
                    {t("total.records")}: {20}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
