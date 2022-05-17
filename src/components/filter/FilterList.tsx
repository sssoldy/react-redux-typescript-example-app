import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectFilters } from '../../features/filters/filtersSlice'
import { Filter } from '../../types/filter'
import FilterItem from './FilterItem'

const FeedFilter: React.FC = () => {
  const { filter, value } = useAppSelector(selectFilters)

  let filterBy
  if (filter === Filter.byTag)
    filterBy = <FilterItem filter={filter} filterValue={value} />

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <FilterItem filter={Filter.all} filterValue={null} />
        {filterBy}
      </ul>
    </div>
  )
}

export default FeedFilter
