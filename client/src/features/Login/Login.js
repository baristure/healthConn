import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginWithCredentials } from "./loginSlice";
import { Form, Formik } from "formik";
import { Input, FormObserver, Button, Loading } from "../common/Elements";
import { NavLink } from "react-router-dom";
const initialValues = {
  email: "",
  password: "",
};
export const Login = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const dispatch = useDispatch();
  const { user, isFetching } = useSelector((state) => state.login);

  const onSubmit = () => {
    console.log("onSubmit");
    dispatch(loginWithCredentials(formValues));
  };
  const onReset = () => {
    console.log("onReset");
  };
  console.log("formValues", formValues);
  const onUpdate = (value) => {
    setFormValues({ ...formValues, ...value });
  };
  if (!user && !isFetching) {
    return (
      <div className="w-full border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white rounded-md pt-2">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            onReset={onReset}
          >
            <Form className="space-y-4 min-h-screen w-full px-4 flex flex-col sm:justify-center justify-start  items-center">
              <FormObserver watch={onUpdate} />
              <h1 className="font-semibold text-2xl text">Welcome to Patient Login Page</h1>
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
                type="password"
                name="password"
                placeholder="Enter a password"
              />
              </div>
              <Button className="sm:w-1/3" type="submit">ENTER</Button>
              <div className="flex flex-col items-end mb-16">
                <NavLink className="underline" to="/login-as-doctor">
                  Login as Doctor
                </NavLink>
                <NavLink className="underline" to="/register">
                  Go to Register Page
                </NavLink>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
  if (isFetching)
    return (
      <div>
        <Loading />
      </div>
    );
  return <div>Welcome {user?.username}</div>;
};
