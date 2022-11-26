import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Input,
  FormObserver,
  Button,
  FormRadioButton,
} from "../common/Elements";
import { registerSchema } from "./registerValidator";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  usertype: "patient",
};

export const Register = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    let { data, status } = await axios
      .post("register", values)
      .then((res) => res)
      .catch((err) => err)
      .finally(() => setLoading(false));

    if (status !== 200) {
      toast.error("Oopps!Something happened. User can not registered");
    } else {
      toast.success("User registered successfully!");
      resetForm();
    }
    console.log("data", data);
  };

  const onUpdate = (value) => {
    setFormValues({ ...formValues, ...value });
  };

  return (
    <div className="w-full border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 ">
      <div className="w-full bg-white rounded-md pt-2">
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4 min-h-screen w-full px-4 flex flex-col sm:justify-center justify-start  items-center">
            <FormObserver watch={onUpdate} />
            <div className="sm:w-1/3 w-full">
              <Input
                isform
                label="Name"
                type="text"
                name="first_name"
                placeholder="Enter a your name"
              />
            </div>
            <div className="sm:w-1/3 w-full">
              <Input
                isform
                label="Surname"
                type="text"
                name="last_name"
                placeholder="Enter a your surname"
              />{" "}
            </div>
            <div className="sm:w-1/3 w-full">
              <Input
                isform
                label="Email"
                type="email"
                name="email"
                placeholder="Enter a your email"
              />
            </div>
            <div className="sm:w-1/3 w-full">
              <Input
                isform
                label="Password"
                type="text"
                name="password"
                placeholder="Enter a password"
                className=""
              />
            </div>
            <div className="sm:w-1/3 w-full pt-4 flex flex-row justify-center ">
              <FormRadioButton
                items={[
                  { label: "Doctor", value: "doctor" },
                  { label: "Patient", value: "patient" },
                ]}
                checked={formValues.usertype}
                name="usertype"
              />
            </div>

            <br />
            <Button type="submit" loading={loading}>
              Register
            </Button>
            <div className="flex flex-col items-end my-16">
              <NavLink className="underline" to="/login">
                Go back to Login Page
              </NavLink>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
