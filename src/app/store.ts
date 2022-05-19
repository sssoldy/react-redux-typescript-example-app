import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import articlesReducer from '../features/articles/articlesSlice'
import filtersReducer from '../features/filters/filtersSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
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
