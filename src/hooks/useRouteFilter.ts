import { useLocation } from 'react-router-dom'
import { baseFilter } from '../config/settings'
import { IArticleFilter } from '../types/filter'

export const useRouteFilter = () => {
  const { pathname, hash } = useLocation()

  let filter: IArticleFilter = {}
  if (pathname === '/' && hash !== '') {
    const tag = hash.substring(1)
    filter = { tag: tag }
  }

  if (pathname === '/' && hash === '') {
    filter = baseFilter
  }

  if (pathname.includes('/@') && hash === '') {
    const username = pathname.substring(pathname.lastIndexOf('@') + 1)
    filter = { author: username }
  }

  return filter
}
