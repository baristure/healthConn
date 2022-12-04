import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BodyComponent } from "./BodyComponent";

import { ComplaintForm } from "./ComplaintForm";
export const Complaints = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(false);
  const { bodyParts } = useSelector((state) => state.appointment);
  useEffect(() => {
    let flag = false;
    Object.keys(bodyParts).forEach((key) => {
      if (bodyParts[key].selected) {
        flag = true;
      }
    });
    setSelected(flag);
  }, [bodyParts]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-2 min-h-screen ">
      <div className="  lg:relative flex justify-center ">
        <div className="  lg:fixed flex flex-col justify-start  border-2 border-gray-200 rounded-md p-6 px-14">
          <div className="text-center">{t("Select Part")}</div>
          <BodyComponent />
        </div>
      </div>
      <div className="space-y-4">
        <div className="mt-4  ">
          <ul className="divide-y divide-gray-200 border-t border-b border-gray-200 sm:px-14">
            {Object.keys(bodyParts).map((key) => {
              if (bodyParts[key]?.selected)
                return <ComplaintForm bodyPart={key} />;
            })}
            {!selected && (
              <div className="text-center rounded-md p-6 px-14">
                {t("selectingTitle")}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
