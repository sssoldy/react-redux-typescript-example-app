import { AsyncThunkAction } from '@reduxjs/toolkit'
import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectArticlesFilter } from '../../features/articles/articlesSlice'
import { IArticleFilter } from '../../types/filter'
import { isFiltersEqual } from '../../utils/misc'

interface FilterItemProps {
  children: React.ReactNode
  filter: IArticleFilter
  onClick: () => AsyncThunkAction<any, any, {}>
}

const FilterItem: React.FC<FilterItemProps> = ({
  filter,
  onClick,
  children,
}) => {
  const dispatch = useAppDispatch()

  const stateFilter = useAppSelector(selectArticlesFilter)
  const isActive = isFiltersEqual(stateFilter, filter)
  console.log(stateFilter, filter)

  const onTabClicked = () => {
    dispatch(onClick())
  }

  return (
    <li className="nav-item">
      <span
        style={{ cursor: 'pointer' }}
        className={`nav-link`}
        // className={`nav-link ${isActive ? 'active' : ''}`}
        onClick={onTabClicked}
      >
        {children}
      </span>
    </li>
  )
}

export default FilterItem
