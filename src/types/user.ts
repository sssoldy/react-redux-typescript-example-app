import { ResponseError, ResponseStatus } from './API'

export interface ILoginUser {
  email: string
  password: string
}

export interface IRegisterUser {
  username: string
  email: string
  password: string
}

export interface IUser {
  email: string | null
  token: string | null
  username: string | null
  bio: string | null
  image: string | null
}

export interface UserState {
  user: IUser
  status: ResponseStatus
  error: ResponseError
}
