import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getProfile } from '../../services/conduit'
import { ResponseStatus } from '../../types/API'
import { IProfile, IProfileState } from '../../types/profile'
import { selectArticleByUsername } from '../articles/articlesSlice'

export const fetchProfile = createAsyncThunk<
  IProfile,
  string,
  { state: RootState }
>('profile/fetchProfile', async (username: string, { getState }) => {
  const state = getState()
  const article = selectArticleByUsername(state, username)

  if (article) {
    return article.author
  }

  const response = await getProfile(username)
  return response.data.profile
})

const initialState: IProfileState = {
  profile: null,
  status: ResponseStatus.idle,
  error: null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileWillUnmount: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, state => {
        state.status = ResponseStatus.loading
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload
        state.status = ResponseStatus.successed
        state.error = null
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = ResponseStatus.failed
        state.error = action.error.message ?? null
      })
  },
})

export const { profileWillUnmount } = profileSlice.actions

export const selectProfile = (state: RootState) => state.profile.profile
export const selectProfileStatus = (state: RootState) => state.profile.status
export const selectProfileError = (state: RootState) => state.profile.error

export default profileSlice.reducer
