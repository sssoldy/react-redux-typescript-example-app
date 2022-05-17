import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import articlesReducer from '../features/articles/articlesSlice'
import tagsReducer from '../features/tags/tagsSlice'
import filtersReducer from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    tags: tagsReducer,
    filters: filtersReducer,
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
