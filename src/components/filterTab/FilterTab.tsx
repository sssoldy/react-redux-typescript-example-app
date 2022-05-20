import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { baseFilter } from '../../config/settings'
import { selectArticlesFilter } from '../../features/articles/articlesSlice'
import FilterItem from './FilterItem'

const FilterTab: React.FC = () => {
  const filter = useAppSelector(selectArticlesFilter)

  const isTag = 'tag' in filter
  const isAuthor = 'author' in filter

  return (
    <ul className="nav nav-pills outline-active">
      {isAuthor ? (
        <React.Fragment>
          <FilterItem filter={{ author: filter.author }}>
            {filter.author}`s Articles
          </FilterItem>
          {/* FIXME: With Auth only */}
          {/* <FilterItem filter={{ favorited: filter.favorited }}>
            Favorited Articles
          </FilterItem> */}
        </React.Fragment>
      ) : (
        <FilterItem filter={baseFilter}>Global Feed</FilterItem>
      )}
      {isTag && (
        <FilterItem filter={{ tag: filter.tag }}>#{filter.tag}</FilterItem>
      )}
    </ul>
  )
}

export default FilterTab
