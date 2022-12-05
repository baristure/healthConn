import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { loginWithCredentials, clearState } from "./loginSlice";
import { Form, Formik } from "formik";
import { useAuth } from "../../hooks/useAuth";
import { Input, FormObserver, Button, Loading } from "../common/Elements";
import { Navigate, NavLink } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
  user_type: "patient",
};
export const Login = () => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState(initialValues);

  const dispatch = useDispatch();
  const { user, isFetching } = useSelector((state) => state.login);
  const [loggedIn, userDetail] = useAuth();

  const onSubmit = () => {
    dispatch(loginWithCredentials(formValues));
  };
  // dispatch(clearState());

  const onUpdate = (value) => {
    setFormValues({ ...formValues, ...value });
  };
  if (loggedIn) return <Navigate to={"/dashboard"} />;

  if (!isFetching) {
    return (
      <div className="w-full border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white rounded-md pt-2">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="space-y-4 min-h-screen w-full px-4 flex flex-col sm:justify-center justify-start  items-center">
              <FormObserver watch={onUpdate} />
              <h1 className="font-semibold text-2xl text">
                {t("login.patient")}
              </h1>
              <div className="sm:w-1/3 w-full">
                <Input
                  isform
                  label={t("email")}
                  type="email"
                  name="email"
                  placeholder={t("enter.email.placeholder")}
                />
              </div>
              <div className="sm:w-1/3 w-full">
                <Input
                  isform
                  label={t("password")}
                  type="password"
                  name="password"
                  placeholder={t("enter.password.placeholder")}
                />
              </div>
              <Button className="sm:w-1/3" type="submit">
                {t("ENTER")}
              </Button>
              <div className="flex flex-col items-end mb-16">
                <NavLink className="underline" to="/login-as-doctor">
                  {t("login.as.doctor")}
                </NavLink>
                <NavLink className="underline" to="/register">
                  {t("go.to.register")}
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
      <div className="min-w-screen min-h-screen flex flex-col justify-center align-center">
        <Loading />
      </div>
    );
};
