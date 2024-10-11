import { createSlice } from '@reduxjs/toolkit'

const initialState = { view: 'grid' }

const courseViewModeSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    toggleView(state, action) {
      state.view = action.payload
    },
  },
})

export const courseViewModeActions = courseViewModeSlice.actions
export const courseViewModeReducer = courseViewModeSlice.reducer
