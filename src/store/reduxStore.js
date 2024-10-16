import { configureStore } from '@reduxjs/toolkit'
import {
  courseViewModeReducer,
  darkModeReducer,
  tokenReducer,
  sortFilterReducer,
  articleSortFilterReducer,
} from '@store/index'

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    token: tokenReducer,
    view: courseViewModeReducer,
    sort: sortFilterReducer,
    articleSort: articleSortFilterReducer,
  },
})
