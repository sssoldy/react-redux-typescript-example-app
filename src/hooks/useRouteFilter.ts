import { useLocation } from 'react-router-dom'
import { baseFilter } from '../config/settings'
import { IArticleFilter } from '../types/filter'

export const useRouteFilter = () => {
  const { pathname, hash } = useLocation()
  let filter: IArticleFilter = baseFilter

  if (pathname === '/' && hash !== '') {
    const tag = hash.substring(1)
    return { ...filter, tag: tag }
  }

  if (pathname === '/' && hash === '') {
    return { ...filter }
  }

  if (pathname.includes('/@')) {
    const username = pathname.substring(2)
    filter = { ...filter, author: username }
  }

  return filter
}
