import * as React from 'react'
import { TagVariant } from '../../types/tag'
import Tag from './Tag'

interface TagListProps {
  tags: Array<string>
  variant: TagVariant
}

const TagList: React.FC<TagListProps> = ({ tags, variant }) => {
  return (
    <ul className="tag-list">
      {tags.map(tag => (
        <Tag key={tag} tag={tag} variant={variant} />
      ))}
    </ul>
  )
}

export default TagList
