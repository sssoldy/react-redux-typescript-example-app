import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { IArticle, ArticlesState, MultipleArticles } from '../../types/article'
import { ResponseStatus } from '../../types/API'
import { getArticles } from '../../services/conduit'
import { FiltersState } from '../../types/filter'

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (filters: FiltersState) => {
    const { filter, value } = filters
    const response = await getArticles({
      limit: 20,
      offset: 0,
      [filter]: value,
    })
    return response.data as MultipleArticles // {articles: Array(3), articlesCount: 3}
  },
)

// TODO: Add initial sorting
const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: state => state.slug,
})

const initialState = articlesAdapter.getInitialState<ArticlesState>({
  articlesCount: 0,
  status: ResponseStatus.idle,
  error: null,
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, state => {
        state.status = ResponseStatus.loading
      })
      // FIXME: replace setAll for pagination feature
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { articles, articlesCount } = action.payload
        state.articlesCount = articlesCount
        state.status = ResponseStatus.succeeded
        state.error = null
        articlesAdapter.setAll(state, articles)
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
export const selectArticlesCount = (state: RootState) =>
  state.articles.articlesCount

export default articlesSlice.reducer
