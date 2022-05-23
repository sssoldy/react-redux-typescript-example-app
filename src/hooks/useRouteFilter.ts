import { useLocation } from 'react-router-dom'
import { baseFilter } from '../config/settings'
import { IArticleFilter } from '../types/filter'

export const useRouteFilter = () => {
  const { pathname, hash } = useLocation()

  let filter: IArticleFilter = baseFilter
  if (pathname === '/' && hash !== '') {
    const tag = hash.substring(1)
    filter = { ...filter, tag: tag }
  }

  if (pathname === '/' && hash === '') {
    filter = { ...filter }
  }

  if (pathname.includes('/@') && hash === '') {
    const username = pathname.substring(pathname.lastIndexOf('@') + 1)
    filter = { ...filter, author: username }
  }

  return filter
}
