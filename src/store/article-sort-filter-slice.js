import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pagination: { currentPage: 1, totalPageCount: 5 },
  order: 'insertDate',
  searchTerm: null,
  descendingOrder: true,
  category: null,
  params: null,
  dateRange: { startDate: null, endDate: null },
}

const articleSortFilterSlice = createSlice({
  name: 'articleSort',
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
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    setFilterId(state, action) {
      state.category = action.payload
    },
    setParams(state, action) {
      state.params = action.payload
    },
    setDateRange(state, action) {
      state.dateRange.startDate = action.payload.startDate
      state.dateRange.endDate = action.payload.endDate
    },
  },
})

export const articleSortFilterActions = articleSortFilterSlice.actions
export const articleSortFilterReducer = articleSortFilterSlice.reducer
