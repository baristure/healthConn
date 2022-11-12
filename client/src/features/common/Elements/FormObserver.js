import { useEffect } from "react";
import { useFormikContext } from "formik";

const FormObserver = ({ watch }) => {
  const { values, errors } = useFormikContext();
  useEffect(() => {
    watch(values);
  }, [values]);
  return null;
};
export default FormObserver;
