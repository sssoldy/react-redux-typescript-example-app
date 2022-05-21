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
  email: string
  token: string
  username: string
  bio: string
  image: string
}

export interface IUserState {
  user: IUser | null
  status: ResponseStatus
  error: ResponseError
}
