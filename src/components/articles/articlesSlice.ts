import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { IArticle, ArticlesState, MultipleArticles } from '../../types/article'
import { ResponseStatus } from '../../types/API'
import { getArticles } from '../../services/conduit'

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await getArticles({
      limit: 20,
      offset: 0,
    })
    return response.data as MultipleArticles // {articles: Array(3), articlesCount: 3}
  },
)

// TODO: Add sorting
const articlesAdapter = createEntityAdapter<IArticle>({
  selectId: state => state.id,
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
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { articles, articlesCount } = action.payload
        // TODO: Not sure that I should generate IDs for ID-less articles
        // Have to research this
        articles.map(article => (article.id = nanoid()))
        state.articlesCount = articlesCount
        state.status = ResponseStatus.succeeded
        articlesAdapter.upsertMany(state, articles)
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = ResponseStatus.failed
        state.error = action.error.message ?? null
      })
  },
})

export const {
  selectAll: SelectAllArticles,
  selectById: SelectArticleById,
  selectIds: SelectArticlesIds,
} = articlesAdapter.getSelectors((state: RootState) => state.articles)

export const SelectArticlesError = (state: RootState) => state.articles.error
export const SelectArticlesStatus = (state: RootState) => state.articles.status
export const SelectArticlesCount = (state: RootState) =>
  state.articles.articlesCount

export default articlesSlice.reducer
