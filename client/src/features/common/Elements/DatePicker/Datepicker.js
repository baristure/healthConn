import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { formatDate } from "../../../../lib/utilities";
import FormDatePicker from "./FormDatePicker";
const newDate = new Date();

export default function Datepicker(props) {
  const [dateValue, setDateValue] = useState({
    startDate: newDate,
    endDate: newDate,
  });
  const setStartDate = (val) => {
    setDateValue({
      ...dateValue,
      startDate: val,
    });
  };
  const setEndDate = (val) => {
    setDateValue({
      ...dateValue,
      endDate: val,
    });
  };
  useEffect(() => {
    props.onChange({
      startDate: formatDate(dateValue.startDate),
      endDate: formatDate(dateValue.endDate),
    });
    // eslint-disable-next-line
  }, [dateValue]);

  if (props.isform) return <FormDatePicker {...props} />;

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

      {props.type === "range" ? (
        <div className="flex flex-row justify-between space-x-2">
          <div className="w-full">
            <DatePicker
              className={`p-2 border-gray-300 mr-2 focus:outline-none leading-3 h-9 bg-contrast-10 border-b text-sm rounded-md w-full ${
                props.className
              }  ${props.error ? "border-error" : ""}`}
              selected={dateValue.startDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setStartDate(date)}
              startDate={dateValue.startDate}
              endDate={dateValue.endDate}
              maxDate={newDate}
            />
          </div>
          <div className="w-full">
            <DatePicker
              className={`p-2 border-gray-300 mr-2 focus:outline-none leading-3 h-9 bg-contrast-10 border-b text-sm rounded-md w-full ${
                props.className
              }  ${props.error ? "border-error" : ""}`}
              dateFormat="dd/MM/yyyy"
              selected={dateValue.endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={dateValue.startDate}
              endDate={dateValue.endDate}
              maxDate={newDate}
            />
          </div>
        </div>
      ) : (
        <DatePicker
          selected={dateValue.startDate}
          dateFormat="dd/MM/yyyy"
          className={`border-b text-sm rounded-md leading-3	p-2 bg-contrast-10 h-9  border-gray-300 mr-2 focus:outline-none w-full ${
            props.className
          }  ${props.error ? "border-error" : ""}`}
          {...props}
          onChange={(date) => setStartDate(date)}
        />
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
