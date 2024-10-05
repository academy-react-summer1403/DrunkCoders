import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: { darkMode: false },
  reducers: {
    toggleMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const darkModeActions = darkModeSlice.actions;
export const darkModeReducer = darkModeSlice.reducer;
