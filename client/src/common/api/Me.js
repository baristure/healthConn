import http from "./Axios.config";

const meAPI = {
  updateProfile: async (body) => {
    console.log('HOPPALAAA')
    return http.post(`/api/me/update`, body);
  },
};
export default meAPI;
