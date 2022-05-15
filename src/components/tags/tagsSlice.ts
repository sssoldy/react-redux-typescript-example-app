import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTags } from '../../services/conduit'
import { ResponseStatus } from '../../types/API'
import { TagsState } from '../../types/tag'

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const response = await getTags()
  return response.data.tags as Array<string>
})

const initialState: TagsState = {
  tags: [],
  status: ResponseStatus.idle,
  error: null,
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTags.pending, state => {
        state.status = ResponseStatus.loading
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = ResponseStatus.succeeded
        state.tags = action.payload
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = ResponseStatus.failed
        state.error = action.error.message ?? null
      })
  },
})

export default tagsSlice.reducer
