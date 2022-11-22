import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginAPI from "../../common/api/Login";

export const loginWithCredentials = createAsyncThunk(
  "/loginWithCredentials",
  async (params, { rejectWithValue }) => {
    try {
      const response = await loginAPI.post(params);
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

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.isFetching = false
      state.isSuccess = false
      state.isError = false
      state.errorMessage = ""

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithCredentials.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      return state;
    });
    builder.addCase(loginWithCredentials.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      // state.errorMessage = payload.message;
    });
    builder.addCase(loginWithCredentials.pending, (state) => {
      state.isFetching = true;
    });
  },
});
export const { clearState } = loginSlice.actions;

export const loginSelector = (state) => state.login;

export const loginReducer = loginSlice.reducer;
