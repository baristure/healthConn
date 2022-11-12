import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import { useState, useEffect } from "react";
const newDate = new Date();

export default function DateSelector({ ...props }) {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [dateRange, setDateRange] = useState({
    startDate: newDate,
    endDate: newDate,
  });
  const [dateValue, setDateValue] = useState(newDate);
  const setStartDate = (val) => {
    setDateRange({
      ...dateRange,
      startDate: val,
    });
  };
  const setEndDate = (val) => {
    setDateRange({
      ...dateRange,
      endDate: val,
    });
  };
  useEffect(() => {
    setFieldValue(field.name, {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
  }, [dateRange]);
  useEffect(() => {
    setFieldValue(field.name, dateValue);
  }, [dateValue]);
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
              {...field}
              className={`p-2 border-gray-300 mr-2 focus:outline-none leading-3 h-9 bg-contrast-10 border-b text-sm rounded-md w-full ${
                props.className
              }  ${props.error ? "border-error" : ""}`}
              selected={dateRange.startDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setStartDate(date)}
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              maxDate={newDate}
            />
          </div>
          <div className="w-full">
            <DatePicker
              className={`p-2 border-gray-300 mr-2 focus:outline-none leading-3 h-9 bg-contrast-10 border-b text-sm rounded-md w-full ${
                props.className
              }  ${props.error ? "border-error" : ""}`}
              dateFormat="dd/MM/yyyy"
              selected={dateRange.endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              maxDate={newDate}
            />
          </div>
        </div>
      ) : (
        <DatePicker
          {...props}
          {...field}
          selected={dateValue}
          dateFormat="dd/MM/yyyy"
          minDate={newDate}
          className={`border-b text-sm rounded-md leading-3	p-2 bg-contrast-10 h-9  border-gray-300 mr-2 focus:outline-none w-full ${
            props.className
          }  ${props.error ? "border-error" : ""}`}
          onChange={(date) => setDateValue(date)}
        />
      )}

      {props.labelHelper && (
        <p className="mt-2 text-2xs text-contrast-70">{props.labelHelper}</p>
      )}
      {meta.error && (
        <p className="mt-2 text-sm text-error-text">{meta.error}</p>
      )}
      {props.successText && (
        <p className="mt-2 text-sm text-success-text">{props.successText}</p>
      )}
    </div>
  );
}
