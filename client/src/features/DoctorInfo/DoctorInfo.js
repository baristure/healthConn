import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import doctorAPI from "../../common/api/DoctorInfo";

export const DoctorInfo = () => {
  const { service, doctor_id } = useParams();
  const [doctorInfo, setDoctorInfo] = React.useState();
  const fetchDoctorInfo = async () => {
    const info = await doctorAPI.get(service, doctor_id);
    setDoctorInfo(info);
  };

  React.useEffect(() => {
    if (!doctor_id) return;
    fetchDoctorInfo();
  }, [doctor_id]);
console.log('doctorInfo ', doctorInfo)
  return <h1>Hi</h1>;
};
