import { useField, useFormikContext } from "formik";

export default function FormCheckbox({ ...props }) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const colorClass =
    props.color === "primary"
      ? "input-primary"
      : props.color === "error"
      ? "input-error"
      : props.color === "success"
      ? "input-success"
      : props.color === "green"
      ? "input-green"
      : "input-black";

  const formClass = props.form === "rounded" ? "rounded-full" : "rounded";

  const fontClass =
    props.font === "bold"
      ? "font-bold"
      : props.font === "semibold"
      ? "font-bold"
      : "font-normal";

  const textColorClass =
    props.textColor === "primary"
      ? "text-primary-text"
      : props.textColor === "error"
      ? "text-error-text"
      : props.textColor === "success"
      ? "text-success-text"
      : props.textColor === "green"
      ? "text-green-600"
      : "text-contrast-90";

  const disabledClass = props.isDisabled
    ? "bg-lightgray-300 cursor-not-allowed"
    : "";

  return (
    <div className="flex flex-col justify-start">
      <div className="relative flex items-center leading-3 ">
        <div className="flex items-center justify-center ">
          {props.trueLabel || props.falseLabel ? (
            <input
              {...props}
              className={`${
                props.className
              } h-4 w-4 border-gray-300 bg-contrast-10 accent-darkblue ${colorClass} ${formClass} ${disabledClass} ${
                meta.touched && meta.error ? "border-error" : ""
              }`}
            />
          ) : (
            <input
              {...props}
              checked={field.value}
              onChange={() => setFieldValue(field.name, !field.value)}
              className={` ${
                props.className
              } h-4 w-4 border-gray-300 bg-contrast-10 accent-darkblue ${colorClass} ${formClass} ${disabledClass} ${
                meta.touched && meta.error ? "border-error" : ""
              }`}
            />
          )}
          {meta.touched && meta.error && (
            <p className="mt-2 text-sm text-error-text">{meta.error}</p>
          )}
        </div>

        <div className="ml-2 pb-0">
          <label
            htmlFor={props.id}
            className={` ${textColorClass} ${fontClass} text-sm text-contrast-90 `}
          >
            {props.label}
          </label>
        </div>
      </div>
    </div>
  );
}
