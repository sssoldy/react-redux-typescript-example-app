import { ResponseError, ResponseStatus } from './API'

export interface IProfile {
  username: string
  bio: string
  image: string
  following: boolean
}

export type IProfileState = {
  profile: IProfile | null
  status: ResponseStatus
  error: ResponseError
}
