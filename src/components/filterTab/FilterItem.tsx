import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchArticles,
  selectArticlesFilter,
} from '../../features/articles/articlesSlice'
import { IArticleFilter } from '../../types/filter'
import { isFiltersEqual } from '../../utils/misc'

interface FilterItemProps {
  filter: IArticleFilter
  children: React.ReactNode
}

const FilterItem: React.FC<FilterItemProps> = ({ filter, children }) => {
  const dispatch = useAppDispatch()
  const stateFilter = useAppSelector(selectArticlesFilter)

  const isActive = isFiltersEqual(stateFilter, filter)

  const onTabClicked = () => {
    dispatch(fetchArticles(filter))
  }

  return (
    <li className="nav-item">
      <span
        style={{ cursor: 'pointer' }}
        className={`nav-link ${isActive ? 'active' : ''}`}
        onClick={onTabClicked}
      >
        {children}
      </span>
    </li>
  )
}

export default FilterItem
