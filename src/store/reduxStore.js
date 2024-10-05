import { configureStore } from "@reduxjs/toolkit";
import { darkModeReducer } from "@store";

export const store = configureStore({ reducer: { darkMode: darkModeReducer } });
