import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { IArticle, IArticles, IArticlesState } from '../../types/article'
import { ResponseStatus } from '../../types/API'
import { getArticles, getUserArticles } from '../../services/conduit'
import { IArticleFilter } from '../../types/filter'
import { baseFilter } from '../../config/settings'

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticleList',
  async (filter: IArticleFilter) => {
    const response = await getArticles(filter)
    return response.data
  },
)

export const fetchUserArticles = createAsyncThunk<
  IArticles,
  IArticleFilter,
  { state: RootState }
>(
  'articles/fetchUserArticleList',
  async (filter: IArticleFilter, { getState }) => {
    const state = getState()
    const token = state.user.user?.token as string
    const response = await getUserArticles(token, filter)
    return response.data
  },
)

// TODO: Add initial sorting
const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: state => state.slug,
})

const initialState = articlesAdapter.getInitialState<IArticlesState>({
  articlesCount: 0,
  status: ResponseStatus.idle,
  error: null,
  filter: baseFilter,
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        isPending(fetchArticles, fetchUserArticles),
        (state, action) => {
          state.status = ResponseStatus.loading
          state.filter = action.meta.arg
        },
      )
      // FIXME: replace setAll for pagination feature
      .addMatcher(
        isFulfilled(fetchArticles, fetchUserArticles),
        (state, action) => {
          const { articles, articlesCount } = action.payload
          articlesAdapter.setAll(state, articles)
          state.articlesCount = articlesCount
          state.status = ResponseStatus.successed
          state.error = null
        },
      )
      .addMatcher(
        isRejected(fetchArticles, fetchUserArticles),
        (state, action) => {
          state.status = ResponseStatus.failed
          state.error = action.error.message ?? null
        },
      )
  },
})

export const {
  selectAll: selectAllArticles,
  selectById: selectArticleById,
  selectIds: selectArticlesIds,
} = articlesAdapter.getSelectors((state: RootState) => state.articles)

export const selectArticlesError = (state: RootState) => state.articles.error
export const selectArticlesStatus = (state: RootState) => state.articles.status
export const selectArticlesFilter = (state: RootState) => state.articles.filter
export const selectArticlesCount = (state: RootState) =>
  state.articles.articlesCount

export const selectArticleByUsername = createSelector(
  [selectAllArticles, (_, username: string) => username],
  (articles, username) =>
    articles.find(article => article.author.username === username),
)

export default articlesSlice.reducer
