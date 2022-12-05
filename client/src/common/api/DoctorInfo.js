import http from "./Axios.config";

const doctorAPI = {
  get: async (doctor_id) => {
    const response = await http
      .get(`/doctors/${doctor_id}`)
      .then((res) => {
        console.log("res", res);
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
