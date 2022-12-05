import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import appointmentAPI from "../../common/api/Appointment";

export const submitAppointment = createAsyncThunk(
  "/submitAppointment",
  async (params, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.post(params);
      if (response.status === 200) {
        toast.success("Appointment taken successfully");
        return true;
      } else {
        toast.error("Something happened 🙁 Please try again.");
        return rejectWithValue("Something happened 🙁 Please try again.");
      }
    } catch (e) {
      return rejectWithValue(e.data.message);
    }
  }
);

export const appoinmentSlice = createSlice({
  name: "appointment",
  initialState: {
    progress: 1,
    selectedDate: null,
    bodyParts: {},
    userId: null,
    doctorId: null,
    clinic: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    handleProgress: (state, { payload }) => {
      state.progress = Number(payload);
      return state;
    },
    handleBodyPart: (state, { payload }) => {
      const id = payload.id || payload.parentElement.id;
      const newParts = { ...state.bodyParts };

      if (newParts[id] === true || newParts[id] === false) {
        newParts[id] = !newParts[id];
      } else if (newParts[id]) {
        newParts[id].selected = !newParts[id].selected;
      } else {
        newParts[id] = {
          selected: true,
          side: "front",
          painLevel: 0,
          comment: "",
        };
      }
      state.bodyParts = newParts;
      return state;
    },
    handleDateChange: (state, { payload }) => {
      state.selectedDate = payload;
      return state;
    },
    handleBodyPartComplaintForm: (state, { payload }) => {
      state.bodyParts[payload.key] = payload.value;
      return state;
    },
    clearState: (state) => {
      state = {
        progress: 1,
        selectedDate: null,
        bodyParts: {},
        userId: null,
        doctorId: null,
        clinic: null,
        isFetching: false,
        isSuccess: false,
        isError: false,
      };

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitAppointment.fulfilled, (state, { payload }) => {
      // state.user = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      return state;
    });
    builder.addCase(submitAppointment.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(submitAppointment.pending, (state) => {
      state.isFetching = true;
    });
  },
});

export const {
  clearState,

  handleProgress,
  handleBodyPart,
  handleBodyPartComplaintForm,
  handleDateChange,
} = appoinmentSlice.actions;

export const appointmentSelector = (state) => state.appointment;

export const appointmentReducer = appoinmentSlice.reducer;
