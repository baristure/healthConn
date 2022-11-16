import InputMask from "react-input-mask";

import FormInput from "./FormInput";
export default function Input(props) {
  if (props.isform) return <FormInput {...props} />;

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

      {props.type === "textarea" ? (
        <textarea className={`${props.className}`} {...props}></textarea>
      ) : props.mask ? (
        <InputMask
          mask={props.mask}
          maskChar={null}
          {...props}
          className={`text-sm text-contrast-90 border-b p-2 bg-contrast-10 border-gray-300 mr-2 focus:outline-none w-full ${
            props.className
          } ${props.error ? "border-error" : ""}`}
        />
      ) : (
        <div className="w-full relative">
          <input
            {...props}
            className={`border-b text-contrast-90 text-sm rounded-md leading-3 h-9 p-2 bg-contrast-10 border-gray-300 mr-2 focus:outline-none w-full ${
              props.className
            } ${props.error ? "border-error" : ""}`}
          />
        </div>
      )}

      {props.labelHelper && (
        <p className="mt-2 text-2xs text-contrast-70">{props.labelHelper}</p>
      )}
      {props.error && (
        <p className="mt-2 text-sm text-error-text">{props.error}</p>
      )}
      {props.successText && (
        <p className="mt-2 text-sm text-success-text">{props.successText}</p>
      )}
    </div>
  );
}
