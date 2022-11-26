import { object, string, number } from "yup";

export const filtersSchema = object({
  username: string()
    .required("Username is mandatory")
    .min(3, "Username can not be shorter then 3 chars"),
  password: string()
    .required("password is mandatory")
    .min(3, "password can not be shorter then 3 chars"),
});
