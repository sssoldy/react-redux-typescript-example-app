import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { baseFilter } from '../../config/settings'
import {
  fetchArticles,
  fetchUserArticles,
  selectArticlesFilter,
} from '../../features/articles/articlesSlice'
import FilterItem from './FilterItem'

interface GlobalTabProps {}

const GlobalTab: React.FC<GlobalTabProps> = () => {
  const filter = useAppSelector(selectArticlesFilter)
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn)
  const isTagFilter = filter.tag

  const globalTab = (
    <FilterItem filter={baseFilter} onClick={() => fetchArticles(baseFilter)}>
      Global Feed
    </FilterItem>
  )

  const userTab = (
    <FilterItem
      filter={baseFilter}
      onClick={() => fetchUserArticles(baseFilter)}
    >
      Your Feed
    </FilterItem>
  )

  const tagTab = (
    <FilterItem
      filter={{ ...baseFilter, tag: filter.tag }}
      onClick={() => fetchArticles({ ...baseFilter, tag: filter.tag })}
    >
      #{filter.tag}
    </FilterItem>
  )

  return (
    <ul className="nav nav-pills outline-active">
      {isLoggedIn && userTab}
      {globalTab}
      {isTagFilter && tagTab}
    </ul>
  )
}
export default GlobalTab
