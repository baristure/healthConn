import { object, string } from "yup";

export const registerSchema = object({
  first_name: string()
    .required("Name can not be blank")
    .min(2, "Name can not be shorter than 2 chars")
    .max(15, "Name can not be longer than 15 chars."),
  last_name: string()
    .required("Surname can not be blank")
    .min(2, "Surname can not be shorter than 2 chars")
    .max(10, "Surname can not be longer than 10 chars."),
  email: string()
    .email("Enter a valid email")
    .required("Please enter an email address"),
  password: string()
    .required("Password can not be blank")
    .min(3, "Password can not be shorter than 3 chars")
    .max(12, "Password can not be longer than 12 chars."),
});
