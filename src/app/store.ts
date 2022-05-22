import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import articlesReducer from '../features/articles/articlesSlice'
import articleReducer from '../features/article/articleSlice'
import profileReducer from '../features/profile/profileSlice'
import userReducer from '../features/user/userSlice'
import filterReducer from '../features/filter/filterSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
    profile: profileReducer,
    user: userReducer,
    filter: filterReducer,
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
