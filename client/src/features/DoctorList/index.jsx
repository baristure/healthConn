import React from "react";
import { NavLink, useParams } from "react-router-dom";
import doctorListAPI from "../../common/api/DoctorList";
import { Card } from "../common/Elements";

export const DoctorList = () => {
  const { service } = useParams();
  const [doctorList, setDoctorList] = React.useState([]);
  const fetchDoctorList = async () => {
    const doctorList = await doctorListAPI.get(service);
    setDoctorList(doctorList);
  };

  React.useEffect(() => {
    if (!service) return;
    fetchDoctorList();
  }, [service]);
  console.log("doctorList ", doctorList);

  return (
    <div className="p-5">
      <h1>Doctors</h1>
      <h2>
        Specialization: <span>{service}</span>
      </h2>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 md:gap-10 xs:grid-cols-2 xs:gap-8">
        <NavLink
          className="hover:shadow-lg hover:shadow-blue-200"
          key={"service.service_id"}
          //   to={`/services/${service.name.toLowerCase()}`}
        >
          <Card
          // key={service.service_id}
          // img={`/images/${service.name}.jpg`}
          // title={service.name}
          />
        </NavLink>
      </div>
    </div>
  );
};
