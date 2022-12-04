import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appointmentReviewAPI } from "../../../common/api/appointmentReview";
import { toast } from "react-toastify";
import { t } from "i18next";
export const setDoctorNote = createAsyncThunk(
  "appointmentReview/setDoctorNote",
  async (params) => {
    return appointmentReviewAPI.setDoctorNote(params);
  }
);
export const setPatientReview = createAsyncThunk(
  "appointmentReview/setPatientReview",
  async (params) => {
    return appointmentReviewAPI.setPatientRating(params);
  }
);
const initialState = {
  doctorNote: {
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  patientReview: {
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
};
export const appointmentReviewSlice = createSlice({
  name: "appointmentReview",
  initialState,
  reducers: {
    clearDoctorNoteState: (state) => {
      state.doctorNote.isSuccess = false;
      state.doctorNote.isFetching = false;
      state.doctorNote.isError = false;
    },
    clearPatientReviewState: (state) => {
      state.patientReview.isSuccess = false;
      state.patientReview.isFetching = false;
      state.patientReview.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setDoctorNote.fulfilled, (state, action) => {
      state.doctorNote.isSuccess = true;
      state.doctorNote.isFetching = false;
      state.doctorNote.isError = false;
      toast.success(t("success"));
    });
    builder.addCase(setDoctorNote.rejected, (state, action) => {
      state.doctorNote.isSuccess = false;
      state.doctorNote.isFetching = false;
      state.doctorNote.isError = true;
      toast.error(t("error"));
    });
    builder.addCase(setDoctorNote.pending, (state, action) => {
      state.doctorNote.isSuccess = false;
      state.doctorNote.isFetching = true;
      state.doctorNote.isError = false;
    });

    builder.addCase(setPatientReview.fulfilled, (state, action) => {
      state.patientReview.isSuccess = true;
      state.patientReview.isFetching = false;
      state.patientReview.isError = false;
      toast.success(t("success"));
    });
    builder.addCase(setPatientReview.rejected, (state, action) => {
      state.patientReview.isSuccess = false;
      state.patientReview.isFetching = false;
      state.patientReview.isError = true;
      toast.error(t("error"));
    });
    builder.addCase(setPatientReview.pending, (state, action) => {
      state.patientReview.isSuccess = false;
      state.patientReview.isFetching = true;
      state.patientReview.isError = false;
    });
  },
});
export const { clearDoctorNoteState, clearPatientReviewState } =
  appointmentReviewSlice.actions;
export const appointmentReviewReducer = appointmentReviewSlice.reducer;
