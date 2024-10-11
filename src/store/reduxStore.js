import { configureStore } from '@reduxjs/toolkit'
import {
  courseViewModeReducer,
  darkModeReducer,
  tokenReducer,
} from '@store/index'

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    token: tokenReducer,
    view: courseViewModeReducer,
  },
})
