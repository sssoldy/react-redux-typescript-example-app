import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilterState, IReqParams } from '../../types/filter'

const initialState: IFilterState = {
  params: null,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterUpdated: (state, action: PayloadAction<IReqParams>) => {
      const defParams: IReqParams = { limit: 20, offset: 0 }
      const params = action.payload
      state.params = { ...defParams, ...params }
    },
  },
})

export const { filterUpdated } = filterSlice.actions

export default filterSlice.reducer
