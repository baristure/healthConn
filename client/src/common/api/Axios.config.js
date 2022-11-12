import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

// Set config defaults when creating the instance
const http = Axios.create({
  baseURL: BASE_URL,
});

http.defaults.headers.common["Authorization"] = `Bearer xxxxx`;
export default http;
