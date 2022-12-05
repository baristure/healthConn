import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Card from "../common/Elements/Card/Card";
import serviceAPI from "../../common/api/Service";
import { Loading } from "../common/Elements";

export const Service = () => {
  const [serviceList, setServiceList] = useState();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const fetchServiceList = async () => {
    setLoading(true);
    const serviceList = await serviceAPI
      .get()
      .then((res) => res.data)
      .catch((err) => err)
      .finally(() => setLoading(false));
    setServiceList(serviceList.data);
  };

  useEffect(() => {
    fetchServiceList();
  }, []);
  if (loading)
    return (
      <div className="min-w-screen min-h-screen flex flex-col justify-center align-center">
        <Loading />
      </div>
    );
  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-3 md:gap-10 xs:grid-cols-2 xs:gap-8 p-5">
      {serviceList &&
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
                alt={`/images/${service.name}.jpg`}
                title={t(service.name.toLowerCase())}
              />
            </NavLink>
          );
        })}
    </div>
  );
};
