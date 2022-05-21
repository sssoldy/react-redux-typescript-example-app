import axios from 'axios'
import { baseApiUrl } from '../config/settings'
import { IArticle, IArticles } from '../types/article'
import { IComments } from '../types/comment'
import { IArticleFilter } from '../types/filter'
import { IProfile } from '../types/profile'
import { ITags } from '../types/tag'
import { ILoginUser, IRegisterUser, IUser } from '../types/user'

axios.defaults.baseURL = baseApiUrl

// User and Authentication
export const userLogin = async (loginData: ILoginUser) => {
  return await axios.post<{ user: IUser }>('users/login', { user: loginData })
}

export const userRegister = async (registerData: IRegisterUser) => {
  return await axios.post<{ user: IUser }>('users', { user: registerData })
}

// Profile
export const getProfile = async (username: string) => {
  return await axios.get<{ profile: IProfile }>(`profiles/${username}`)
}

// Articles
export const getArticles = async (params: IArticleFilter = {}) => {
  return await axios.get<IArticles>('articles', { params })
}

export const getArticleBySlug = async (slug: string) => {
  return await axios.get<{ article: IArticle }>(`articles/${slug}`)
}

// Comments
export const getComments = async (slug: string) => {
  return await axios.get<IComments>(`/articles/${slug}/comments`)
}

// default
export const getTags = async () => {
  return await axios.get<ITags>('tags')
}
