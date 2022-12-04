import React, { useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  mobile_number: "",
  usertype: "patient",
};

export const Register = () => {
  const { t, i18n } = useTranslation();
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
            <h1 className="  font-semibold text-2xl text">{t("register")}</h1>
            <div className="sm:w-1/3 w-full">
              <Input
                isform
                label={t("name")}
                type="text"
                name="first_name"
                placeholder={t("enter.name.placeholder")}
              />
            </div>
            <div className="sm:w-1/3 w-full">
              <Input
                isform
                label={t("surname")}
                type="text"
                name="last_name"
                placeholder={t("enter.surname.placeholder")}
              />
            </div>
            <div className="sm:w-1/3 w-full">
              <Input
                isform
                label={t("phone.number")}
                type="text"
                name="mobile_number"
                placeholder={t("phone.number.placeholder")}
              />
            </div>
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
                className=""
              />
            </div>
            <div className="sm:w-1/3 w-full flex flex-row justify-center ">
              <FormRadioButton
                items={[
                  { label: t("patient"), value: "patient" },
                  { label: t("doctor"), value: "doctor" },
                ]}
                checked={formValues.usertype}
                name="usertype"
                label={t("account.type")}
              />
            </div>

            <br />
            <Button type="submit" loading={loading} className="sm:w-1/3">
              {t("register")}
            </Button>
            <div className="flex flex-col items-end my-16">
              <NavLink className="underline" to="/login">
                {t("back.to.login")}
              </NavLink>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
