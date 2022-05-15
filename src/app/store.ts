import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import articlesReducer from '../components/articles/articlesSlice'
import tagsReducer from '../components/tags/tagsSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    tags: tagsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
