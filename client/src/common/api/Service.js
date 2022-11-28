import http from "./Axios.config";

const serviceAPI = {
  get: async () => {
    const response = await http
      .get("/services")
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
export default serviceAPI;
