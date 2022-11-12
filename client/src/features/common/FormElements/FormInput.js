import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";
import { useField } from "formik";
export default function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div>
      {label && (
        <div className="flex items-center text-sm">
          <label className="block text-contrast-70 whitespace-nowrap">
            {label}
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
        <textarea
          {...field}
          {...props}
          className={`border-b text-contrast-90 text-sm rounded-md leading-4 h-9 p-2 bg-contrast-10 border-gray-300 mr-2 focus:outline-none w-full  ${
            props.className
          } ${meta.touched && meta.error ? "border-error" : "border-gray-300"}`}
        ></textarea>
      ) : props.mask ? (
        <InputMask
          {...field}
          {...props}
          mask={props.mask}
          maskChar={null}
          className={`border-b text-contrast-90 text-sm rounded-md leading-3 h-9 p-2 bg-contrast-10   mr-2 focus:outline-none w-full ${
            props.className
          } ${props.error && "border-error"} ${
            meta.touched && meta.error ? "border-error" : "border-gray-300"
          }`}
        />
      ) : props.numberFormat ? (
        <div className="w-full relative">
          <NumberFormat
            {...field}
            {...props}
            thousandSeparator={true}
            decimalSeparator={"."}
            decimalScale={2}
            fixedDecimalScale={true}
            allowNegative={false}
            defaultValue={props.defaultValue}
            className={`border-b text-contrast-90 text-sm rounded-md leading-4 h-9 p-2 bg-contrast-10   mr-2 focus:outline-none w-full  ${
              props.className
            } ${
              meta.touched && meta.error
                ? "border-error"
                : props.error
                ? "border-error"
                : "border-gray-300"
            }   
            `}
          />
        </div>
      ) : (
        <div className="w-full relative">
          <input
            {...field}
            {...props}
            className={`border-b text-contrast-90 text-sm rounded-md leading-3 h-9 p-2 bg-contrast-10  mr-2 focus:outline-none w-full ${
              props.className
            }  ${
              meta.touched && meta.error
                ? "border-error"
                : props.error
                ? "border-error"
                : "border-gray-300"
            }   `}
          />
        </div>
      )}

      {props.labelHelper && (
        <p className="mt-2 text-2xs text-contrast-70">{props.labelHelper}</p>
      )}
      {/* {props.error && (
        <p className="mt-2 text-sm text-error-text">{props.error}</p>
      )} */}
      {(meta.touched || meta.error) && (
        <p className="mt-2 text-sm text-error-text">{meta.error}</p>
      )}

      {props.successText && (
        <p className="mt-2 text-sm text-success-text">{props.successText}</p>
      )}
    </div>
  );
}
