import * as React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { TagVariant } from '../../types/tag'
import { filterChanged } from '../../features/filters/filtersSlice'
import { Filter } from '../../types/filter'

interface TagProps {
  tag: string
  variant: TagVariant
}

const Tag: React.FC<TagProps> = ({ tag, variant }) => {
  const dispatch = useAppDispatch()

  const onTagClicked = () => {
    dispatch(filterChanged({ filter: Filter.byTag, value: tag }))
  }

  return (
    <React.Fragment>
      {variant === TagVariant.article && (
        <li className="tag-default tag-pill tag-outline ng-binding ng-scope">
          {tag}
        </li>
      )}

      {variant === TagVariant.popular && (
        <li>
          <a
            href={`#${tag}`}
            className="tag-pill tag-default"
            onClick={onTagClicked}
          >
            {tag}
          </a>
        </li>
      )}
    </React.Fragment>
  )
}

export default Tag
