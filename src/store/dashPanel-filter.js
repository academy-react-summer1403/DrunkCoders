import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPageCount: null,
  params: {
    PageNumber: 1,
    RowsOfPage: 10,
    SortingCol: 'InsertDate',
    SortType: 'DESC',
    Query: null,
    TeacherId: null,
    CostDown: null,
    CostUp: null,
    StartDate: null,
    EndDate: null,
  },
  userPanelCurrentpage: 'dashboard',
}

const dashSortFilterSlice = createSlice({
  name: 'dashSort',
  initialState,
  reducers: {
    setUserPanelCurrentpage(state, action) {
      state.userPanelCurrentpage = action.payload
    },
    setTotalPageCount(state, action) {
      state.totalPageCount = action.payload
    },
    setPageNumber(state, action) {
      state.params.PageNumber = action.payload
    },
    setSearchTerm(state, action) {
      state.params.Query = action.payload
    },
    setTeacherId(state, action) {
      state.params.TeacherId = action.payload
    },

    setCost(state, action) {
      state.params.CostUp = action.payload.costUp
      state.params.CostDown = action.payload.costDown
    },
    setDateRange(state, action) {
      state.params.StartDate = action.payload.startDate
      state.params.EndDate = action.payload.endDate
    },
  },
})

export const dashSortFilterActions = dashSortFilterSlice.actions
export const dashSortFilterReducer = dashSortFilterSlice.reducer
