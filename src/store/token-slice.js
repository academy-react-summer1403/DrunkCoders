import {
  deleteLocalStorage,
  getLocalStroge,
  setLocalStorage,
} from '@core/index'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: getLocalStroge('users') ?? [],
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    logout(state) {
      state.users.forEach((user) =>
        user.isOnline ? (user.isOnline = false) : null,
      )
      setLocalStorage('users', state.users)
    },
    login(state, action) {
      const user = state.users?.find((user) => user.id === action.payload.id)
      if (user) {
        state.users = state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, ...action.payload, isOnline: true }
            : user,
        )
      } else {
        state.users.push({ ...action.payload, isOnline: true })
      }

      setLocalStorage('users', state.users)
    },
    setDefaultProfilePic(state, action) {
      state.users.find((user) => user.isOnline).defaultProfilePic =
        action.payload
      setLocalStorage('users', state.users)
    },
  },
})

export const tokenActions = tokenSlice.actions
export const tokenReducer = tokenSlice.reducer
