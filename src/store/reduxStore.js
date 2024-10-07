import { configureStore } from '@reduxjs/toolkit'
import { darkModeReducer, tokenReducer } from '@store/index'

export const store = configureStore({
  reducer: { darkMode: darkModeReducer, token: tokenReducer },
})
