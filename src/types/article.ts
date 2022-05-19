import { ResponseError, ResponseStatus } from './API'
import { IProfile } from './profile'

export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  tagList: Array<string>
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: IProfile
}

export interface IArticles {
  articles: Array<IArticle>
  articlesCount: number
}

export interface ArticlesState {
  articlesCount: number
  status: ResponseStatus
  error: ResponseError
}
