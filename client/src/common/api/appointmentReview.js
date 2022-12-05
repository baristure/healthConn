import http from "./Axios.config";

export const appointmentReviewAPI = {
  setDoctorNote: async ({ id, doctorNote }) => {
    const response = await http
      .put(`/appointment/${id}`, {
        recognization: doctorNote,
      })
      .then((res) => res.data)
      .catch((err) => err);
    return response;
  },
  setPatientRating: async ({ id, rating, comment }) => {
    const res = await http.post(`/appointment-rating/${id}`, {
      rating,
      comment,
    });
    return res.data;
  },
};
