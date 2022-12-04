import { getDay, setHours, setMinutes, nextMonday, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import * as FontAwesome from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { handleDateChange } from "./appointmentSlice";
const startDate = () => {
  const today = new Date();
  let result = null;
  if (subDays(nextMonday(today), 2) > today) {
    result = today;
  } else {
    result = nextMonday(today);
  }
  return result;
};

export const Booking = () => {
  const Icon = FontAwesome["FaCalendarPlus"];
  const { t } = useTranslation();
  const { selectedDate } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const excludeTimer = () => {
    let excludeTimes = [];
    for (let index = 0; index < 24; index++) {
      if (index < 8 && index < 17) {
        excludeTimes.push(setHours(setMinutes(new Date(), 0), index));
        excludeTimes.push(setHours(setMinutes(new Date(), 30), index));
      }
    }
    return excludeTimes;
  };

  console.log(startDate());
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-2 mt-3">
        <div className="flex flex-col items-center justify-center  w-full">
          <div className="flex-1 items-center justify-center p-6 flex flex-col w-full">
            <div className="flex-1">
              <div className="flex flex-col mt-2 items-center justify-center">
                <div className="h-10 w-10 bg-contrast-5 rounded-full flex items-center justify-center">
                  <Icon className="block h-5 w-5 text-primary" />
                </div>
                <h5 className="text-xl m-6 mb-0 font-medium text-contrast-90 text-center">
                  {t("take.appointment")}
                </h5>

                <p className="text-md text-contrast-50 m-2 text-center px-6">
                  {t("beReady")}
                </p>
                <p className="text-md text-contrast-50 m-2 text-center px-6">
                  {t("beforeDescribeCompliants")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center  w-full">
          <DatePicker
            inline
            showTimeSelect
            calendarStartDay={1}
            className={`border-b text-sm rounded-md  p-2 bg-contrast-10 border-gray-300 mr-2 focus:outline-none w-full`}
            minDate={startDate()}
            selected={Date.parse(selectedDate) || startDate()}
            excludeTimes={excludeTimer()}
            onChange={(val) => {
              dispatch(handleDateChange(val));
            }}
            filterDate={isWeekday}
          />
        </div>
      </div>
    </div>
  );
};
