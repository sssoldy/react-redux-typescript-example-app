import { ResponseError, ResponseStatus } from './API'
import { IArticleFilter } from './filter'
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

export interface IArticleState {
  article: IArticle | null
  status: ResponseStatus
  error: ResponseError
}

export interface IArticles {
  articles: Array<IArticle>
  articlesCount: number
}

export interface IArticlesState {
  articlesCount: number
  status: ResponseStatus
  error: ResponseError
  filter: IArticleFilter
}
