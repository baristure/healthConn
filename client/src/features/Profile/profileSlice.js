import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import meAPI from "../../common/api/Me";

export const updateProfile = createAsyncThunk(
  "/api/me/update",
  async (params, { rejectWithValue }) => {
    try {
      const response = await meAPI.updateProfile(params);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.errorMessage);
      }
    } catch (e) {
      return rejectWithValue(e.data.message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    update: {
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    },
  },
  reducers: {
    clearProfileUpdate: (state) => {
      state.update.isFetching = false;
      state.update.isSuccess = false;
      state.update.isError = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.update.isFetching = false;
      state.update.isSuccess = true;
      state.update.isError = false;
    });
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.update.isFetching = false;
      state.update.isSuccess = false;
      state.update.isError = true;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.update.isFetching = true;
      state.update.isSuccess = false;
      state.update.isError = false;
    });
  },
});

export const { clearProfileUpdate } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
