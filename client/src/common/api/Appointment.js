import http from "./Axios.config";

const appointmentAPI = {
  post: async (params) => {
    console.log(params);
    const response = await http
      .post(`/appointment`, params)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return response;
  },
};
export default appointmentAPI;
