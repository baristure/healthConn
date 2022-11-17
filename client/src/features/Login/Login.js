import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginWithCredentials } from "./loginSlice";
import { Form, Formik } from "formik";
import { Input, FormObserver, Button, Loading  } from "../common/Elements";
const initialValues = {
  username: "",
  password: "",
};
export const Login = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const dispatch = useDispatch();
  const { user, isFetching } = useSelector(
    (state) => state.login
  );

  const onSubmit = () => {
    console.log("onSubmit");
    dispatch(loginWithCredentials(formValues));
  };
  const onReset = () => {
    console.log("onReset");
  };
  console.log('formValues', formValues);
  const onUpdate = (value) => {
    setFormValues({ ...formValues, ...value });
  };
  if (!user && !isFetching) {
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
              label="Username"
              type="text"
              name="username"
              placeholder="Enter a your username"
            />
            <Input
              isform
              label="Password"
              type="text"
              name="password"
              placeholder="Enter a password"
            />
            <Button type="submit">ENTER</Button>
          </Form>
        </Formik>
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
