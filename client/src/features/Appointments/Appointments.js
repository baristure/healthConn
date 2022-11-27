import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button, Loading } from "../common/Elements";
import { NavLink } from "react-router-dom";
import http from "../../common/api/Axios.config";

export const Appointments = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState(null);
  const getAppointments = async () => {
    const res = await http
      .get("/appointments-data") // TODO endpoint have to be change
      .then((res) => res.data)
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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
                Appointment List
              </h1>
              <table className="min-w-full divide-y divide-gray-300 border">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 text-left"
                    >
                      Service Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900 text-left"
                    >
                      Patient Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6 text-center"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        <Loading />
                      </td>
                    </tr>
                  ) : (
                    appointments &&
                    appointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-contrast-90 sm:pl-6 text-left">
                          {appointment.service}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-contrast-90 text-left">
                          {appointment.doctor}
                        </td>

                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-contrast-90 sm:pr-6 text-left">
                          {format(
                            Date.parse(appointment.date),
                            "dd MMMM yyy - HH:mm"
                          )}
                        </td>
                        <td className="whitespace-nowrap text-sm text-contrast-90 text-center">
                          <Button color="primary" hover="primary" size="xs">
                            <NavLink to={`/appointments/${appointment.id}`}>
                              Detay
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
    </div>
  );
};
