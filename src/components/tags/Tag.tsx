import * as React from 'react'
import { TagVariant } from '../../types/tag'

interface TagProps {
  tag: string
  variant: TagVariant
}

const Tag: React.FC<TagProps> = ({ tag, variant }) => {
  let content

  switch (variant) {
    case TagVariant.article:
      content = (
        <li className="tag-default tag-pill tag-outline ng-binding ng-scope">
          {tag}
        </li>
      )
      break
    case TagVariant.popular:
      content = (
        <li>
          <a href={`#${tag}`} className="tag-pill tag-default">
            {tag}
          </a>
        </li>
      )
      break
  }

  return <React.Fragment>{content}</React.Fragment>
}

export default Tag
