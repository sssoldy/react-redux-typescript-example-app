export interface IArticleFilter {
  limit: string
  offset: string
  tag?: string
  author?: string
  favorited?: string
}

export interface IReqParams {
  limit?: number
  offset?: number
  tag?: string
  author?: string
  favorited?: boolean
  token?: boolean
}

export interface IFilterState {
  params: IReqParams | null
}

// export type UserFeedParams = Pick<IReqParams, 'limit' | 'offset' | 'token'> // SAME 1
// export type UserFavParams = Pick<
//   IReqParams,
//   'limit' | 'offset' | 'author' | 'favorited'
// >

// export type ProfileFeedParams = Pick<IReqParams, 'limit' | 'offset' | 'author'>
// export type ProfileFavParams = Pick<
//   IReqParams,
//   'limit' | 'offset' | 'author' | 'favorited'
// >

// export type GlobalFeedParams = Pick<IReqParams, 'limit' | 'offset'>
// export type TagFeedParams = Pick<IReqParams, 'limit' | 'offset' | 'tag'>
// export type MyFeedParams = Pick<IReqParams, 'limit' | 'offset' | 'token'> // SAME 1
