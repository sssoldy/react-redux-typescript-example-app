import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { userLogin, userRegister } from '../../services/conduit'
import { ResponseStatus } from '../../types/API'
import { IUser, ILoginUser, IUserState, IRegisterUser } from '../../types/user'

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async (user: ILoginUser) => {
    const response = await userLogin(user)
    return response.data.user as IUser
  },
)

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (user: IRegisterUser) => {
    const response = await userRegister(user)
    console.log(response)

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

const initialState: IUserState = {
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
        state.status = ResponseStatus.successed
        state.error = null
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.status = ResponseStatus.failed
        state.error = action.error.message ?? null
      })
      // FIXME: Research how to union extra reducers with the same logic
      .addCase(fetchRegisterUser.pending, state => {
        state.status = ResponseStatus.loading
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.status = ResponseStatus.successed
        state.error = null
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
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
