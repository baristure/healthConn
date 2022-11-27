import { toast } from "react-toastify";

export function handleError(error, setErrors) {
  if (error.response.status === 401 || error.response.status === 419) {
    // doğrulama yapılamadı
    toast.error("Please login to your account!");
  } else if (error.response.status === 500) {
    toast.error(
      "A problem has occurred and we are unable to process your operation at this time. Please try again in a few minutes."
    );
  } else if (error.response.status > 401 && error.response.status < 419) {
    toast.error(error.response.data.message);
  } else if (error.response.status === 422 || error.response.status === 400) {
    if (setErrors) {
      setErrors(error.response.data.message);
    }

    const message = error.response.data.message;
    if (typeof message === "object") {
      toast.error(
        "Please check the information you have submitted. You have sent incomplete or incorrect information."
      );
    } else {
      toast.error(error.response.data.message);
    }
  }
  // Do something with response error
  console.error(error.response);
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}
