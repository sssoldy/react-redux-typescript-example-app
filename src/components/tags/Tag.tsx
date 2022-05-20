import * as React from 'react'
import { TagVariant } from '../../types/tag'

interface TagProps {
  tag: string
  variant: TagVariant
}

const Tag: React.FC<TagProps> = ({ tag, variant }) => {
  return (
    <React.Fragment>
      {variant === TagVariant.article && (
        <li className="tag-default tag-pill tag-outline ng-binding ng-scope">
          {tag}
        </li>
      )}

      {variant === TagVariant.popular && (
        <li>
          <a href={`#${tag}`} className="tag-pill tag-default">
            {tag}
          </a>
        </li>
      )}
    </React.Fragment>
  )
}

export default Tag
