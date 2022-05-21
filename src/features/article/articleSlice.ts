import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getArticleBySlug } from '../../services/conduit'
import { ResponseStatus } from '../../types/API'
import { IArticle, IArticleState } from '../../types/article'
import { selectArticleById } from '../articles/articlesSlice'

export const fetchArticle = createAsyncThunk<
  IArticle,
  string,
  { state: RootState }
>('article/fetchArticle', async (slug: string, { getState }) => {
  const state = getState()
  const article = selectArticleById(state, slug)

  if (article) return article

  const response = await getArticleBySlug(slug)
  return response.data.article
})

const initialState: IArticleState = {
  article: null,
  status: ResponseStatus.idle,
  error: null,
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    articleWillUnmount: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticle.pending, state => {
        state.status = ResponseStatus.loading
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.article = action.payload
        state.status = ResponseStatus.successed
        state.error = null
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = ResponseStatus.failed
        state.error = action.error.message ?? null
      })
  },
})

export const { articleWillUnmount } = articleSlice.actions

export default articleSlice.reducer
