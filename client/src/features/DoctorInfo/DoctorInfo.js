import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { faker } from "@faker-js/faker";
import doctorAPI from "../../common/api/DoctorInfo";
import { Loading } from "../common/Elements";
import { Button } from "../common/Elements";

export const DoctorInfo = ({ setDoctor, setService }) => {
  const { service, doctor_id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState();
  const [loading, setLoading] = useState(false);
  const fetchDoctorInfo = async () => {
    setLoading(true);
    const response = await doctorAPI
      .get(doctor_id)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    setDoctorInfo(response);
  };

  const bookAppointment = (doctor) => {
    setDoctor(doctor);
    setService(service);
    navigate("/appointment");
  };

  useEffect(() => {
    if (!doctor_id) return;
    fetchDoctorInfo();
  }, [doctor_id]);
  useEffect(() => {
    console.log("doctorInfo", doctorInfo);
  }, [doctorInfo]);

  if (loading)
    return (
      <div className="min-w-screen min-h-screen flex flex-col justify-center align-center">
        <Loading />
      </div>
    );
  return (
    doctorInfo && (
      <div>
        <div className="p-4 mt-3 w-full">
          <div className="w-full flex flex-col justify-center items-center">
            <img
              className="h-40 w-40 bg-transparent rounded-full flex items-center justify-center mr-"
              src={doctorInfo.image_url || "/images/unknow_doctor.jpg"}
              alt={doctorInfo.image_url}
            />
            <h2 className="text-2xl font-semibold py-2">
              {`${doctorInfo.first_name} ${doctorInfo.last_name}`}
            </h2>
            <div className="mx-auto max-w-2xl px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8 pb-8 w-full">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
                {t("Resume")}
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
                                {doctorInfo.resume}
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
                {t("Memberships")}
              </h1>
              <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <div className="lg:col-span-2"></div>
                <section className="lg:col-span-8 w-full">
                  <ul className="divide-gray-200 border-t border-gray-200 w-full">
                    {doctorInfo.memberships &&
                      doctorInfo.memberships.map((membership) => {
                        return (
                          <li
                            key={faker.random.numeric(5)}
                            className="flex py-1 sm:py-1 w-full"
                          >
                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6 w-full">
                              <div className="mt-1 flex text-base w-full">
                                {membership.name}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </section>
                <div className="lg:col-span-2"></div>
              </div>
            </div>
            <div className="mx-auto max-w-2xl px-4 pt-4 sm:px-6 lg:max-w-7xl lg:px-8  w-full">
              <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
                {t("Publications")}
              </h1>
              <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                <div className="lg:col-span-2"></div>
                <section className="lg:col-span-8 w-full">
                  <ul className="divide-gray-200 border-t border-gray-200 w-full">
                    {doctorInfo.publications &&
                      doctorInfo.publications.map((publication) => {
                        return (
                          <li
                            key={faker.random.numeric(5)}
                            className="flex py-1 sm:py-1 w-full"
                          >
                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6 w-full">
                              <div className="mt-1 flex text-base w-full">
                                {publication.name}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </section>
                <div className="lg:col-span-2"></div>
              </div>
            </div>
            <div className="w-full flex justify-evenly my-5">
              <Button
                type="button"
                size="md"
                color="primary"
                hover="primary"
                callback={() => navigate(`/services/${doctorInfo.speciality}`)}
                className="mr-2 w-20"
              >
                {t("Back")}
              </Button>
              <Button
                type="submit"
                color="success"
                hover="success"
                size="md"
                className="mr-3"
                callback={() => bookAppointment(doctorInfo)}
              >
                {t("take.appointment")} &rarr;
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
