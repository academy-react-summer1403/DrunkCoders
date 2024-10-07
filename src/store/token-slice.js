import {
  deleteLocalStorage,
  getLocalStroge,
  setLocalStorage,
} from '@core/index'
import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: getLocalStroge('token') ? true : false }

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    logout(state) {
      state.token = false
      deleteLocalStorage('token')
    },
    login(state, action) {
      state.token = true
      setLocalStorage('token', action.payload)
    },
  },
})

export const tokenActions = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer
