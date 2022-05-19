import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Filter, IFiltersState } from '../../types/filter'

const initialState: IFiltersState = {
  filter: Filter.all,
  value: null,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterChanged(state, action: PayloadAction<IFiltersState>) {
      const { filter, value } = action.payload
      state.filter = filter
      state.value = value
    },
  },
})

export const selectFilters = (state: RootState) => state.filters

export const { filterChanged } = filterSlice.actions

export default filterSlice.reducer
