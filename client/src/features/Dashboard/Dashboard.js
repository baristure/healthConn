import { toast } from "react-toastify";
import { faker } from "@faker-js/faker";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { Button, Loading } from "../common/Elements";
import { useEffect, useState } from "react";
import appointmentAPI from "../../common/api/Appointment";

export const Dashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const bmi = (
    user.weight /
    ((user.height / 100) * (user.height / 100))
  ).toFixed(2);

  const getBMIValue = (val) => {
    return val < 18.5
      ? "Underweight"
      : val >= 18.5 && val <= 24.9
      ? "Healthy weight"
      : val >= 25 && val <= 29.9
      ? "Overweight"
      : "Obesity";
  };

  return (
    <>
      <main className="flex-1">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 flex flex-row flex-wrap items-center justify-between sm:px-6 lg:px-8">
          <span className="text-2xl font-medium leading-6 text-contrast-90 sm:truncate ">
            Welcome {faker.name.fullName()}
          </span>
        </div>
        {/* 1/3 Cards */}
        {/* <div className="px-4 mt-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4 xl:grid-cols-4 mt-3">
            <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md w-full h-24">
              {faker.random.word()}
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md w-full h-24">
              {faker.random.word()}
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md w-full h-24">
              {faker.random.word()}
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-md shadow-md w-full h-24">
              {faker.random.word()}
            </div>
          </div>
        </div> */}
        {/* 2/3 1/3 row */}
        {user.user_type === "patient" && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3 mt-6 sm:px-6 lg:px-8 px-4">
            <div className="relative rounded-md col-span-2 bg-white px-6 py-5 shadow-md flex items-center">
              <div className="col-span-2 w-full">
                <div className="flex flex-col">
                  <div className="text-lg font-medium text-contrast-90">
                    <h2 className="text-center font-bold pl-6 pb-2">
                      BMI Chart
                    </h2>
                    <img src="/images/bmi-chart.png" alt="bmichart" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex shadow-md rounded-md bg-white py-6 justify-center w-full">
              <div className="space-y-2">
                <h2 className="text-center font-bold">Your Summary</h2>
                <div className="text-left">
                  <span className="font-bold">Age:</span>{" "}
                  <span className="pl-2">{user.age}</span>
                </div>
                <div className="text-left">
                  <span className="font-bold">Weight:</span>{" "}
                  <span className="pl-2">{user.weight} kg</span>
                </div>
                <div className="text-left">
                  <span className="font-bold">Height:</span>{" "}
                  <span className="pl-2">{user.height} cm</span>
                </div>
                <div className="text-left">
                  <span className="font-bold">Your BMI:</span>{" "}
                  <span className="pl-2">
                    {bmi + " "} {getBMIValue(bmi)}
                  </span>
                </div>
                <div className="text-left">
                  <ul className="list-disc pl-2">
                    <li>Underweight: BMI is less than 18.5</li>
                    <li>Healthy weight: BMI is between 18.5 and 24.9</li>
                    <li>Overweight: BMI is between 25 and 29.9</li>
                    <li>Obesity: BMI is 30 or more</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full row */}
        {/* <div className=" mt-6 sm:px-6 lg:px-8 px-4">
          <div className="relative rounded-md  bg-white px-6 py-5 shadow-md flex items-center">
            <div className=" w-full">
              <div className="flex flex-col">
                <div className="text-lg font-medium text-contrast-90">
                  <div className="mb-2">
                    <Button
                      type="submit"
                      color="primary"
                      hover="primary"
                      className="mr-3"
                      size="md"
                    >
                      Primary
                    </Button>
                    <Button
                      type="button"
                      color="gray"
                      hover="gray"
                      size="md"
                      className="mr-3"
                      callback={() => console.log("Hello World")}
                    >
                      Secondary
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      type="submit"
                      color="success"
                      hover="success"
                      size="md"
                      className="mr-3"
                      callback={() => showToast("success", "Success message")}
                    >
                      Success Toast
                    </Button>
                    <Button
                      type="button"
                      color="error"
                      hover="error"
                      size="md"
                      className="mr-3"
                      callback={() => showToast("error", "error message")}
                    >
                      Error Toast
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      hover="primary"
                      size="md"
                      className="mr-3"
                      callback={() => showToast("info", "info message")}
                    >
                      Information Toast
                    </Button>
                  </div>
                  <div className="mb-2">
                    <Button
                      type="submit"
                      color="primary"
                      hover="primary"
                      size="lg"
                      loading={true}
                    >
                      Primary
                    </Button>
                  </div>

                  <div className="w-1/2 mb-5">
                    <Input
                      type="text"
                      name="textInput"
                      // isForm={true}
                      label="Username"
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>

                  <div className="w-1/2 mb-5">
                    <SelectBox
                      label={"Please select"}
                      options={[
                        {
                          value: 0,
                          label: "Option 1",
                        },
                        {
                          value: 1,
                          label: "Option 2",
                        },
                        {
                          value: 2,
                          label: "Option 3",
                        },
                      ]}
                      onChange={(val) => console.log(val)}
                      defaultValue={0}
                      value={0}
                    />
                  </div>
                  <div className="w-1/2 mb-5">
                    <Datepicker
                      label="Time Range"
                      name="dateRange"
                      type="range"
                      onChange={(val) => console.log(val)}
                    />
                    <Datepicker
                      label="Time Select"
                      name="dateSelect"
                      onChange={(val) => console.log(val)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

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
                        {user.user_type === "doctor"
                          ? "Patient Name"
                          : "Doctor Name"}
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
                                No appointment found
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
                                Detail
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
