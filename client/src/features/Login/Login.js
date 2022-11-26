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
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl">Welcome to Patient Login Page</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          onReset={onReset}
        >
          <Form className="my-16">
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
              type="password"
              name="password"
              placeholder="Enter a password"
            />
            <Button type="submit">ENTER</Button>
          </Form>
        </Formik>
        <div className="flex flex-col items-end mb-16">
          <NavLink className="underline" to="/login-as-doctor">Login as Doctor</NavLink>
          <NavLink className="underline" to="/register">
            Go to Register Page
          </NavLink>
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
