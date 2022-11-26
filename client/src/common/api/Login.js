import http from "./Axios.config";

const loginAPI = {
  post: async ({ username, password }) => {
    const response = await http
      .post(`/login`, { username, password })
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
export default loginAPI;
