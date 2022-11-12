import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
      return state;
    },
  },
});
export const { changeLoadingStatus } = loadingSlice.actions;

export const loadingSelector = (state) => state.loading;

export const loadingReducer = loadingSlice.reducer;
