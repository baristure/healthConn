import http from "./Axios.config";

const loginAPI = {
  post: async ({ email, password, user_type }) => {
    const response = await http
      .post(`/login?user_type=${user_type}`, { email, password })
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
