import { useState } from "react";
import { Form, Formik } from "formik";
import { Input, FormObserver, Button } from "../common/Elements";
import { NavLink } from "react-router-dom";
const initialValues = {
  email: "",
  password: "",
  usertype: "patient",
};

export const Register = () => {
  const [formValues, setFormValues] = useState(initialValues);


  const onSubmit = () => {
    console.log("onSubmit");
  };
  const onReset = () => {
    console.log("onReset");
  };
  console.log("formValues", formValues);
  const onUpdate = (value) => {
    setFormValues({ ...formValues, ...value });
  };
  console.log("formValues", formValues);
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <Form>
          <FormObserver watch={onUpdate} />
          <Input
            isform
            label="Email"
            type="email"
            name="email"
            placeholder="Enter a your email"
          />
          <Input
            isform
            label="Password"
            type="text"
            name="password"
            placeholder="Enter a password"
          />
          <div className="flex">
            <label className="flex items-center py-4 pr-8">
              Doctor
              <Input
                isform
                className="m-4"
                type="radio"
                name="usertype"
                value="doctor"
              />
            </label>
            <label className="flex items-center py-4 pr-8">
              Patient
              <Input
                isform
                className="m-4"
                type="radio"
                name="usertype"
                value="patient"
              />
            </label>
          </div>
          <br />
          <Button type="submit">Register</Button>
          <div className="flex flex-col items-end my-16">
            <NavLink className="underline" to="/login">
              Go back to Login Page
            </NavLink>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
