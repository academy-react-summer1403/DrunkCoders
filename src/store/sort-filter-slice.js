import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pagination: { currentPage: 1, totalPageCount: 5 },
  order: 'costDesc',
  searchTerm: null,
  descendingOrder: true,
  filterId: { category: null, level: null, teacher: null },
  cost: { costUp: null, costDown: null },
  dateRange: { startDate: null, endDate: null },
  params: null,
}

const sortFilterSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setTotalPageCount(state, action) {
      state.pagination.totalPageCount = action.payload
    },
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload
    },
    setOrder(state, action) {
      state.order = action.payload
      if (action.payload === 'Action') state.descendingOrder = true
      else if (action.payload === 'costAsc') state.descendingOrder = false
      else if (action.payload === 'costDesc') state.descendingOrder = true
      else if (action.payload === 'InsertDate') state.descendingOrder = true
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    setFilterId(state, action) {
      state.filterId[action.payload.filterIdentifier] = action.payload.id
    },
    setCost(state, action) {
      state.cost.costUp = action.payload.costUp
      state.cost.costDown = action.payload.costDown
    },
    setDateRange(state, action) {
      state.dateRange.startDate = action.payload.startDate
      state.dateRange.endDate = action.payload.endDate
    },
    setParams(state, action) {
      state.params = action.payload
    },
  },
})

export const sortFilterActions = sortFilterSlice.actions
export const sortFilterReducer = sortFilterSlice.reducer
