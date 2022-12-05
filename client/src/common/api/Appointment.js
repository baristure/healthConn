import http from "./Axios.config";

const appointmentAPI = {
  post: async (params) => {
    const response = await http
      .post(`/appointments`, params)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return response;
  },
  getAll: async ({ pageNumber, pageSize }) => {
    const response = await http
      .get(`/appointments?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return response;
  },
};
export default appointmentAPI;
