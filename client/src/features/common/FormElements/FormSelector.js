import Select from "react-select";
import { useField, useFormikContext } from "formik";

export default function FormSelector({ ...props }) {
  const [field, meta] = useField(props);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: props.isMulti ? "#FFFFF" : "#E8EBEF",
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
      width: props.valueWidth ? props.valueWidth : "100%",
    }),
  };

  const onChange = ({ value }) => {
    setFieldValue(field.name, value);
  };
  const onBlur = () => {
    setFieldTouched(field.name, true);
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
      <div className="text-sm rounded-md leading-3 mr-2 w-full">
        <Select
          id={props.id}
          styles={customStyles}
          menuPlacement={props.placement || "bottom"}
          placeholder={props.placeholder}
          options={props.options}
          defaultValue={props.defaultValue}
          isSearchable={props.isSearchable ? true : false}
          onChange={onChange}
          isMulti={props.isMulti ? true : false}
          classNamePrefix={props.classNamePrefix}
          className={props.className}
          onBlur={onBlur}
          isDisabled={props.isDisabled ? true : false}
        />
      </div>

      {props.labelHelper && (
        <p className="mt-2 text-2xs text-contrast-70">{props.labelHelper}</p>
      )}
      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-error-text">{meta.error}</p>
      )}
      {props.successText && (
        <p className="mt-2 text-sm success-text">{props.successText}</p>
      )}
    </div>
  );
}
