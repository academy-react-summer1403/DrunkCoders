import { getLocalStroge } from '@core'
import { setLocalStorage } from '@core/index'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: getLocalStroge('darkMode') ?? false,
  userPanelSidebar: false,
}

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleMode(state) {
      state.darkMode = !state.darkMode
      setLocalStorage('darkMode', state.darkMode)
    },
    toggleUserPanelSideBar(state) {
      state.userPanelSidebar = !state.userPanelSidebar
    },
  },
})

export const darkModeActions = darkModeSlice.actions
export const darkModeReducer = darkModeSlice.reducer
