import http from "./Axios.config";

const doctorListAPI = {
  get: async (service) => {
    service = service.replaceAll("%20", " ");
    const response = await http
      .get(`/services/${service}/doctors`)
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
export default doctorListAPI;
