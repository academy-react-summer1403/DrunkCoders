import {
  deleteLocalStorage,
  getLocalStroge,
  setLocalStorage,
} from '@core/index'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: getLocalStroge('token') ?? null,
  userId: getLocalStroge('userId') ?? null,
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    logout(state) {
      state.token = false
      deleteLocalStorage('token')
    },
    login(state, action) {
      state.token = action.payload.token
      setLocalStorage('token', action.payload.token)
      setLocalStorage('userId', action.payload.userId)
    },
  },
})

export const tokenActions = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer
