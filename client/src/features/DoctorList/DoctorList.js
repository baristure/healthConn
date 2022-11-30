import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import doctorListAPI from "../../common/api/DoctorList";
import { Card } from "../common/Elements";
import Button from "../common/Elements/Button/Button";

export const DoctorList = () => {
  const { service } = useParams();
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = React.useState([]);
  const fetchDoctorList = async () => {
    const doctorList = await doctorListAPI.get(service);
    setDoctorList(doctorList.data);
  };

  React.useEffect(() => {
    if (!service) return;
    fetchDoctorList();
  }, [service]);
  console.log("doctorList ", doctorList);
  return (
    <div className="p-5 h-screen">
      <h1 className="font-sans text-4xl font-bold tracking-wider text-blue-900 mb-4">
        Doctors
      </h1>
      <h2 className="font-sans text-2xl font-normal tracking-normal text-gray-700 mb-6">
        Specialization:&nbsp;
        <span className="font-sans text-2xl font-medium tracking-normal text-gray-900 mb-6">
          {service}
        </span>
      </h2>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 md:gap-10 xs:grid-cols-2 xs:gap-8">
        {doctorList.length ? (
          doctorList.map((doctor) => {
            return (
              <NavLink
                className="hover:shadow-lg hover:shadow-blue-200"
                key={doctor.id}
                to={`/services/${service}/${doctor.id}`}
              >
                <Card
                  key={doctor.id}
                  img={doctor.image_url || "/images/unknow_doctor.jpg"}
                  title={`${doctor.first_name} ${doctor.last_name}`}
                  initialRating={doctor.rating || 0}
                  position="flex-row"
                />
              </NavLink>
            );
          })
        ) : (
          <div>
            <p className="font-sans text-2xl font-normal tracking-normal text-gray-700 mb-6">
              Sorry, there is no specialists for now
            </p>
            <Button
              type="submit"
              color="primary"
              hover="primary"
              className="mr-3"
              size="md"
              callback={() => navigate("/services")}
            >
              &larr; Back to specialists
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};