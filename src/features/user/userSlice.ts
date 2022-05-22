import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getUser, userLogin, userRegister } from '../../services/conduit'
import { ResponseStatus } from '../../types/API'
import { ILoginUser, IUserState, IRegisterUser, IUser } from '../../types/user'

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async (user: ILoginUser) => {
    const response = await userLogin(user)
    return response.data.user
  },
)

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (user: IRegisterUser) => {
    const response = await userRegister(user)
    return response.data.user
  },
)

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (token: string) => {
    const response = await getUser(token)
    return response.data.user
  },
)

const initialState: IUserState = {
  user: null,
  isLoggedIn: false,
  status: ResponseStatus.idle,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // https://redux-toolkit.js.org/api/createAsyncThunk
  // https://redux-toolkit.js.org/api/createAsyncThunk#type
  // https://redux-toolkit.js.org/api/matching-utilities
  extraReducers(builder) {
    builder
      .addMatcher(
        isPending(fetchLoginUser, fetchRegisterUser, fetchCurrentUser),
        state => {
          state.status = ResponseStatus.loading
        },
      )
      .addMatcher(
        isFulfilled(fetchLoginUser, fetchRegisterUser, fetchCurrentUser),
        (state, action) => {
          const user = action.payload as IUser
          state.user = user
          state.isLoggedIn = true
          window.localStorage.setItem('jwt', user.token)
          state.status = ResponseStatus.successed
          state.error = null
        },
      )
      .addMatcher(
        isRejected(fetchLoginUser, fetchRegisterUser, fetchCurrentUser),
        (state, action) => {
          state.isLoggedIn = false
          state.status = ResponseStatus.failed
          state.error = action.error.message ?? null
        },
      )
  },
})

export default userSlice.reducer

export const selectUserState = (state: RootState) => state.user
export const selectUser = (state: RootState) => state.user.user
export const selectUserError = (state: RootState) => state.user.error
export const selectUserStatus = (state: RootState) => state.user.status
