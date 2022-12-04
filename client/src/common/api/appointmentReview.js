import http from "./Axios.config";

export const appointmentReviewAPI = {
  setDoctorNote: async ({ id, doctorNote }) => {
    const res = await http.post(`/api/appointment-doctor-note/${id}`, {
      doctorNote,
    });
    return res.data;
  },
  setPatientRating: async ({ id, rating, comment }) => {
    const res = await http.post(`/api/appointment-rating/${id}`, {
      rating, comment
    });
    return res.data;
  },
};
