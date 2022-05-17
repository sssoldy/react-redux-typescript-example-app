import { ResponseError, ResponseStatus } from './API'

export enum TagVariant {
  article = 'article',
  popular = 'popular',
}

export interface TagsState {
  entities: Array<string>
  status: ResponseStatus
  error: ResponseError
}
