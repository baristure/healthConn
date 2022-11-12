import http from "./Axios.config";

const example = {
  get: async (page, limit) => {
    const response = await http
      .get(`/example?limit=${limit}&page=${page}`)
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
export default example;
