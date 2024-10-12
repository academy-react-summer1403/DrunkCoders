import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  view: 'grid',
  pagination: { currentPage: 1, totalPageCount: 5 },
}

const courseViewModeSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    toggleView(state, action) {
      state.view = action.payload
    },
    setTotalPageCount(state, action) {
      state.pagination.totalPageCount = action.payload
    },
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload
    },
  },
})

export const courseViewModeActions = courseViewModeSlice.actions
export const courseViewModeReducer = courseViewModeSlice.reducer
