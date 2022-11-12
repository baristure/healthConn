import Select from "react-select";
import FormSelectBox from "./FormSelectBox";

export default function SelectBox(props) {
  if (props.isForm) return <FormSelectBox {...props} />;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#E8EBEF",
      textColor: "#263445",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#8D97A4" : "#E8EBEF",
      border: state.isFocused ? "2px solid #0287EF" : "",
      // Removes weird border around container
      height: 36,
      minHeight: 36,

      padding: "0",
      boxShadow: state.isFocused ? null : null,
      // "&:hover": {
      //   // Overwrittes the different states of border
      //   borderColor: state.isFocused ? "#8D97A4" : "#E8EBEF",
      // },
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "33px",
      padding: "0 6px",
    }),
  };

  return (
    <div>
      {props.label && (
        <div className="flex items-center text-sm">
          <label className="block text-contrast-70 whitespace-nowrap">
            {props.label}
          </label>
          {props.definition && (
            <p className="block text-contrast-70 text-darkblue-400 whitespace-nowrap ml-1">
              ({props.definition})
            </p>
          )}
          {props.required && <p className="block text-contrast-70">*</p>}
        </div>
      )}
      <div className="text-sm rounded-md mr-2 w-full">
        <Select
          styles={customStyles}
          menuPlacement={props.placement || "bottom"}
          placeholder={props.placeholder}
          options={props.options}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
          // value={props.value}
          isSearchable={props.isSearchable ? true : false}
        />
      </div>

      {props.labelHelper && (
        <p className="mt-2 text-2xs text-contrast-70">{props.labelHelper}</p>
      )}
      {props.error && (
        <p className="mt-2 text-base error-text">{props.error}</p>
      )}
      {props.successText && (
        <p className="mt-2 text-base success-text">{props.successText}</p>
      )}
    </div>
  );
}
