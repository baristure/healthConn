import { useSelector, useDispatch } from "react-redux";
import * as FontAwesome from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { Input, SelectBox } from "../../common/Elements";
import {
  handleBodyPartComplaintForm,
  handleBodyPart,
} from "../appointmentSlice";
import { bodyPartExplanations } from "../../../constants/bodyPartExplanations";

const sideOptions = [
  {
    value: "front",
    label: "Front Side",
  },
  {
    value: "back",
    label: "Back Side",
  },
];
export const ComplaintForm = ({ bodyPart }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { bodyParts } = useSelector((state) => state.appointment);
  const Icon = FontAwesome["FaRegTimesCircle"];

  const getBodyPartExplanation = (bodyPart) => {
    console.log(bodyPartExplanations[bodyPart])
    return bodyPartExplanations[bodyPart];
  };
  const removePart = (target) => {
    const obj = {
      id: target,
    };
    dispatch(handleBodyPart(obj));
  };
  const handleComplaintForm = (val) => {
    let partComplaints = bodyParts[bodyPart];
    partComplaints = {
      ...partComplaints,
      ...val,
    };
    dispatch(
      handleBodyPartComplaintForm({ key: bodyPart, value: partComplaints })
    );
  };

  return (
    <>
      <li key={bodyPart} className="flex py-6 sm:py-10">
        <div className=" flex flex-1 flex-col justify-between">
          <div className="relative pr-9 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:pr-0 mb-2">
            <div className="col-span-2">
              <div className="flex justify-between">
                <h3 className="text-center">
                  {t("Body Part")}: {t(getBodyPartExplanation(bodyPart))}
                </h3>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 sm:pr-9">
              <div className="absolute top-0 right-0">
                <button
                  type="button"
                  className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => {
                    removePart(bodyPart);
                  }}
                >
                  <span className="sr-only">{t("Remove")}</span>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <SelectBox
            options={sideOptions}
            name="bodyPartSide"
            label={t("selectSide") + " *"}
            value={
              sideOptions.find(
                (item) => item.value === bodyParts[bodyPart].side
              ) || sideOptions[0]
            }
            onChange={(val) => handleComplaintForm({ side: val.value })}
            defaultValue={sideOptions[0]}
          />
          <div className="mt-2">
            <label
              htmlFor="steps-range"
              className="block text-sm py-1 text-contrast-70 whitespace-nowrap"
            >
              {t("Pain level")}:{" "}
              {bodyParts[bodyPart].painLevel <= 0.5
                ? `${bodyParts[bodyPart].painLevel}: ${t("No pain")}`
                : bodyParts[bodyPart].painLevel <= 3
                ? `${bodyParts[bodyPart].painLevel}: ${t("Mild")}`
                : bodyParts[bodyPart].painLevel <= 6
                ? `${bodyParts[bodyPart].painLevel}: ${t("Moderate")}`
                : bodyParts[bodyPart].painLevel <= 9
                ? `${bodyParts[bodyPart].painLevel}: ${t("Severe")}`
                : `${bodyParts[bodyPart].painLevel}: ${t("Very severe")}`}
            </label>
            <input
              id="steps-range"
              type="range"
              min="0"
              max="10"
              step="1"
              value={bodyParts[bodyPart].painLevel}
              onChange={(e) =>
                handleComplaintForm({ painLevel: e.target.value })
              }
              className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer "
            />
          </div>
          <div className="flex space-x-2 text-sm text-left text-gray-700">
            <div className="mt-2 w-full">
              <Input
                label={t("Explain your complaint")}
                name={bodyPart}
                type="textarea"
                value={bodyParts[bodyPart].comment || ""}
                rows="2"
                onChange={(e) =>
                  handleComplaintForm({ comment: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
