import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BodyComponent } from "./BodyComponent";

import { ComplaintForm } from "./ComplaintForm";
export const Complaints = () => {
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
          <div className="text-center">Select Part</div>
          <BodyComponent />
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-center">Comments</div>
        {Object.keys(bodyParts).map((key) => {
          if (bodyParts[key]?.selected) return <ComplaintForm bodyPart={key} />;
        })}
        {!selected && (
          <div className="text-center border-2 border-gray-200 rounded-md p-6 px-14">
            Please select which part of do you feel pain
          </div>
        )}
      </div>
    </div>
  );
};
