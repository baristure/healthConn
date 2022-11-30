import http from "./Axios.config";

const doctorAPI = {
  get: async (service, doctor_id) => {
    const response = await http
      .get(`/services/${service}/${doctor_id}`)
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
export default doctorAPI;