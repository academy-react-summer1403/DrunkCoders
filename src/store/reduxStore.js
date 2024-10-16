import { configureStore } from '@reduxjs/toolkit'
import {
  courseViewModeReducer,
  darkModeReducer,
  tokenReducer,
} from '@store/index'
import { sortFilterReducer } from './sort-filter-slice'

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    token: tokenReducer,
    view: courseViewModeReducer,
    sort: sortFilterReducer,
  },
})
