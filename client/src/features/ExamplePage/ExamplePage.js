import { useState } from "react";
import { Form, Formik } from "formik";
import { Input, Button, FormObserver } from "../common/Elements/index";
import { filtersSchema } from "../../common/validators/yupValidator";
const initialValues = {
  username: "",
  password: "",
};
export const ExamplePage = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const clearFilters = () => {
    console.log("cleared");
    setFormValues(initialValues);
  };
  const onUpdate = (value) => {
    console.log("observe form", value);
    setFormValues({ ...formValues, ...value });
  };

  const onSubmit = async (values, actions) => {
    console.log("submit", values);
  };
  return (
    <>
      <main className="flex-1">
        <div className="px-4 mt-6 sm:px-6 lg:px-8 w-1/2">
          <Formik
            initialValues={initialValues}
            validationSchema={filtersSchema}
            onSubmit={onSubmit}
            onReset={clearFilters}
          >
            <Form>
              <FormObserver watch={(val) => onUpdate(val)} />
              <Input
                type="text"
                name="username"
                isform={true}
                label="Username"
                placeholder="Enter an username"
              />
              <Input
                type="text"
                name="password"
                isform={true}
                label="Password"
                placeholder="Enter a password"
              />
              <div className="mt-3 text-end mr-3">
                <Button
                  type="reset"
                  color="gray"
                  hover="gray"
                  size="xs"
                  className="mr-3"
                >
                  Clear
                </Button>
                <Button type="submit" color="primary" hover="primary" size="xs">
                  Submit
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </main>
    </>
  );
};
