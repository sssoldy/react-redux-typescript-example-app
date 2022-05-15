import { ResponseError, ResponseStatus } from './API'
import { Profile } from './profile'

export interface Article {
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
  articles: Array<Article>
  articlesCount: number
}

export interface ArticlesState {
  articlesCount: number
  status: ResponseStatus
  error: ResponseError
}
