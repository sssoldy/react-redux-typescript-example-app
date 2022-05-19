import { IProfile } from './profile'

export interface IComment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: IProfile
}

export interface IComments {
  comments: Array<IComment>
}
