import axios from 'axios'
import { baseApiUrl } from '../config/settings'

axios.defaults.baseURL = baseApiUrl

export const getArticles = async (params = {}) => {
  return await axios.get('articles', { params })
}

export const getTags = async (params = {}) => {
  return await axios.get('tags', { params })
}
