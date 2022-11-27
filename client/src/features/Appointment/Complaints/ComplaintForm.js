import { useSelector, useDispatch } from "react-redux";

import { Input, SelectBox } from "../../common/Elements";
import { handleBodyPartComplaintForm } from "../appointmentSlice";
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
  const dispatch = useDispatch();
  const { bodyParts } = useSelector((state) => state.appointment);

  const getBodyPartExplanation = (bodyPart) => {
    return bodyPartExplanations[bodyPart];
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
    console.log("partComplaints", partComplaints);
  };

  return (
    <div className="px-4 space-y-2">
      <div className="text-center">{getBodyPartExplanation(bodyPart)}</div>
      <SelectBox
        options={sideOptions}
        name="bodyPartSide"
        label="Please select a side*"
        value={
          sideOptions.find((item) => item.value === bodyParts[bodyPart].side) ||
          sideOptions[0]
        }
        onChange={(val) => handleComplaintForm({ side: val.value })}
        defaultValue={sideOptions[0]}
      />
      <div>
        <label
          htmlFor="steps-range"
          className="block text-sm py-1 text-contrast-70 whitespace-nowrap"
        >
          Pain level:{" "}
          {bodyParts[bodyPart].painLevel <= 0.5
            ? `${bodyParts[bodyPart].painLevel}: No pain`
            : bodyParts[bodyPart].painLevel <= 3
            ? `${bodyParts[bodyPart].painLevel}: Mild`
            : bodyParts[bodyPart].painLevel <= 6
            ? `${bodyParts[bodyPart].painLevel}: Moderate`
            : bodyParts[bodyPart].painLevel <= 9
            ? `${bodyParts[bodyPart].painLevel}: Severe`
            : `${bodyParts[bodyPart].painLevel}: Very severe`}
        </label>
        <input
          id="steps-range"
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={bodyParts[bodyPart].painLevel}
          onChange={(e) => handleComplaintForm({ painLevel: e.target.value })}
          className="w-full h-2 bg-blue-400 rounded-lg appearance-none cursor-pointer "
        />
      </div>
      <div className="mt-2 w-full">
        <Input
          label="Explain your complaint"
          name={bodyPart}
          type="textarea"
          value={bodyParts[bodyPart].comment || ""}
          rows="2"
          onChange={(e) => handleComplaintForm({ comment: e.target.value })}
        />
      </div>
    </div>
  );
};
