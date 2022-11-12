import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isOpen: true,
    sideBarOpen: false,
  },
  reducers: {
    changeOpen: (state) => {
      state.isOpen = !state.isOpen;
      return state;
    },
    changeSideBarOpen: (state) => {
      state.sideBarOpen = !state.sideBarOpen;
      return state;
    },
  },
});
export const { changeOpen, changeSideBarOpen } = navbarSlice.actions;

export const navbarSelector = (state) => state.navbar;

export const navbarReducer = navbarSlice.reducer;
