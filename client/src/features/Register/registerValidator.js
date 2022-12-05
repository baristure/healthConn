import { object, string } from "yup";

export const registerSchema = object({
  first_name: string()
    .required("empty.name")
    .min(2, "short.name")
    .max(15, "long.name"),
  last_name: string()
    .required("empty.surname")
    .min(2, "short.surname")
    .max(10, "long.surname"),
  email: string().email("valid.email").required("empty.email"),
  password: string()
    .required("empty.password")
    .min(3, "short.password")
    .max(12, "long.password"),
  mobile_number: string()
    .required("empty.phone.number")
    // phone number regex
    // https://stackoverflow.com/a/16699507/7975831
    .matches(/^\+\d+$/gm, "valid.phone.number"),
});
