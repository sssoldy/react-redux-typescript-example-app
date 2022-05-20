import axios from 'axios'
import { baseApiUrl } from '../config/settings'
import { IArticleFilter } from '../types/filter'
import { ILoginUser, IRegisterUser } from '../types/user'

axios.defaults.baseURL = baseApiUrl

// Articles
export const getArticles = async (params: IArticleFilter = {}) => {
  return await axios.get('articles', { params })
}

export const getArticleBySlug = async (slug: string) => {
  return await axios.get(`articles/${slug}`)
}

// Comments
export const getComments = async (slug: string) => {
  return await axios.get(`/articles/${slug}/comments`)
}

export const getTags = async (params: IArticleFilter = {}) => {
  return await axios.get('tags', { params })
}

// User and Authentication
export const userLogin = async (loginData: ILoginUser) => {
  return await axios.post('users/login', { user: loginData })
}

export const userRegister = async (registerData: IRegisterUser) => {
  return await axios.post('users', { user: registerData })
}

// Profile
export const getProfile = async (username: string) => {
  return await axios.get(`profiles/${username}`)
}
