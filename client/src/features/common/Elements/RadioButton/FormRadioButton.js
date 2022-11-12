import { useField, Field } from "formik";

export default function FormRadioButton({ ...props }) {
  const [field, meta] = useField(props);

  const getUniqueID = () => {
    return "_" + Math.random().toString(36).substring(2, 9);
  };
  const componentId = props.id ? props.id : getUniqueID();

  return (
    <div className="flex flex-col justify-start">
      <div className="relative flex items-center leading-3 ">
        <div className="flex items-center justify-center space-x-4 text-base text-contrast-90">
          {props.items.map((item, index) => {
            return (
              <div key={componentId + "-" + index}>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    id={componentId + "-" + index}
                    className={` h-4 w-4 hidden  ${
                      meta.touched && meta.error ? "border-error" : ""
                    }  ${props.className}`}
                    name={field.name}
                    value={item.value}
                  />
                  <label
                    htmlFor={componentId + "-" + index}
                    className="flex items-center cursor-pointer"
                  >
                    <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"></span>
                    {item.label}
                  </label>
                </label>
              </div>
            );
          })}

          {meta.touched && meta.error && (
            <p className="mt-2 text-sm text-error-text">{meta.error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
