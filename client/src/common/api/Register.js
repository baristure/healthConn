import http from "./Axios.config";
import { format } from "date-fns";
const registerAPI = {
  post: async (data) => {
    console.log("registerAPI", data);
    if (data.user_type === "patient") {
      data.birth_date = new Date();
      data.story = "lorem ipsum";
    }
    const response = await http
      .post(`/register?user_type=${data.user_type}`, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    console.log("response", response);
    return response;
  },
};
export default registerAPI;
