import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { IArticle, IArticlesState } from '../../types/article'
import { ResponseStatus } from '../../types/API'
import { getArticles } from '../../services/conduit'
import { IArticleFilter } from '../../types/filter'
import { baseFilter } from '../../config/settings'

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticleList',
  async (filter: IArticleFilter) => {
    const response = await getArticles({
      ...baseFilter,
      ...filter,
    })
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
      .addCase(fetchArticles.pending, (state, action) => {
        state.status = ResponseStatus.loading
        state.filter = action.meta.arg
      })
      // FIXME: replace setAll for pagination feature
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { articles, articlesCount } = action.payload
        articlesAdapter.setAll(state, articles)
        state.articlesCount = articlesCount
        state.status = ResponseStatus.successed
        state.error = null
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = ResponseStatus.failed
        state.error = action.error.message ?? null
      })
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
