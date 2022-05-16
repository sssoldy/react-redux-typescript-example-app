import { ResponseError, ResponseStatus } from './API'
import { Profile } from './profile'

export interface IArticle {
  id: string
  slug: string
  title: string
  description: string
  body: string
  tagList: Array<string>
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Profile
}

export interface MultipleArticles {
  articles: Array<IArticle>
  articlesCount: number
}

export interface ArticlesState {
  articlesCount: number
  status: ResponseStatus
  error: ResponseError
}
