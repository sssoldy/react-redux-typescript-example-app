import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  filterChanged,
  selectFilters,
} from '../../features/filters/filtersSlice'
import { Filter } from '../../types/filter'

interface FilterItemProps {
  filter: Filter
  filterValue: string | null
}

const FilterItem: React.FC<FilterItemProps> = ({ filter, filterValue }) => {
  const { filter: stateFilter } = useAppSelector(selectFilters)
  const dispatch = useAppDispatch()

  const onItemClicked = () => {
    dispatch(filterChanged({ filter: filter, value: filterValue }))
  }

  const isActive = filter === stateFilter

  return (
    <li className="nav-item">
      <a
        className={`nav-link ${isActive ? 'active' : ''}`}
        href={`#${filterValue}`}
        onClick={onItemClicked}
      >
        {filterValue ? `#${filterValue}` : 'Global Feed'}
      </a>
    </li>
  )
}

export default FilterItem
