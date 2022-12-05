import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const localStorageStr = localStorage.getItem("persist:root");
let token = "";
if (localStorageStr) {
  const localStorageObj = JSON.parse(localStorageStr);

  token = JSON.parse(localStorageObj?.login).user;
}

// Set config defaults when creating the instance
const http = Axios.create({
  baseURL: "https://z6qdujukbg.execute-api.us-west-2.amazonaws.com/latest",
});

http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
export default http;
