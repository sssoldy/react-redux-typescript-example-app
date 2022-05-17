import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ResponseStatus } from '../../types/API'
import { TagVariant } from '../../types/tag'
import TagList from './TagList'
import { fetchTags } from '../../features/tags/tagsSlice'

const TagsPopular: React.FC = () => {
  const { entities: tags, status, error } = useAppSelector(state => state.tags)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (status === ResponseStatus.idle) {
      dispatch(fetchTags())
    }
  }, [dispatch, status])

  // TODO: Refactor it
  if (status === ResponseStatus.loading) return <div>Loading tags...</div>
  if (status === ResponseStatus.failed) return <div>Error: {error}</div>
  if (tags.length === 0) return <div>Nothing found</div>

  return (
    <React.Fragment>
      <TagList tags={tags} variant={TagVariant.popular} />
    </React.Fragment>
  )
}

export default TagsPopular
