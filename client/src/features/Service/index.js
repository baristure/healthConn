import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Card from "../common/Elements/Card/Card";
import serviceAPI from "../../common/api/Service";
import { Loading } from "../common/Elements";

export const Service = () => {
  const [serviceList, setServiceList] = useState();
  const fetchServiceList = async () => {
    const serviceList = await serviceAPI.get();
    setServiceList(serviceList.data);
  };

  useEffect(() => {
    fetchServiceList();
  }, []);

  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-3 md:gap-10 xs:grid-cols-2 xs:gap-8 p-5">
      {serviceList ? (
        serviceList.map((service) => {
          return (
            <NavLink
              className="hover:shadow-lg hover:shadow-blue-200"
              key={service.service_id}
              to={`/services/${service.name.toLowerCase()}`}
            >
              <Card
                key={service.service_id}
                img={`/images/${service.name}.jpg`}
                title={service.name}
              />
            </NavLink>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
};
