import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { userLogin } from '../../services/conduit'
import { ResponseStatus } from '../../types/API'
import { IUser, ILoginUser, UserState } from '../../types/user'

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async (user: ILoginUser) => {
    const response = await userLogin(user)
    return response.data.user as IUser
  },
)

const user: IUser = {
  email: null,
  token: null,
  username: null,
  bio: null,
  image: null,
}

const initialState: UserState = {
  user,
  status: ResponseStatus.idle,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLoginUser.pending, state => {
        state.status = ResponseStatus.loading
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = ResponseStatus.succeeded
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.status = ResponseStatus.failed
        state.error = action.error.message ?? null
      })
  },
})

export default userSlice.reducer

export const selectUserState = (state: RootState) => state.user
export const selectUser = (state: RootState) => state.user.user
export const selectUserError = (state: RootState) => state.user.error
export const selectUserStatus = (state: RootState) => state.user.status