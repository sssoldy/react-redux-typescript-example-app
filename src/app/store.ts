import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import articlesReducer from '../features/articles/articlesSlice'
import tagsReducer from '../features/tags/tagsSlice'
import filtersReducer from '../features/filters/filtersSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    tags: tagsReducer,
    filters: filtersReducer,
    user: userReducer,
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
