import axios from 'axios'
import { baseApiUrl } from '../config/settings'
import { ILoginUser } from '../types/user'

axios.defaults.baseURL = baseApiUrl

export const getArticles = async (params = {}) => {
  return await axios.get('articles', { params })
}

export const getTags = async (params = {}) => {
  return await axios.get('tags', { params })
}

export const userLogin = async (loginData: ILoginUser) => {
  return await axios.post('users/login', { user: loginData })
}
