import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ResponseStatus } from '../../types/API'
import { TagVariant } from '../../types/tag'
import TagList from './TagList'
import { fetchTags } from './tagsSlice'

const TagsPopular: React.FC = () => {
  // TODO: add selectors
  const tags = useAppSelector(state => state.tags.tags)
  const status = useAppSelector(state => state.tags.status)
  const error = useAppSelector(state => state.tags.error)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (status === ResponseStatus.idle) {
      dispatch(fetchTags())
    }
  }, [dispatch, status])

  let content

  switch (status) {
    case ResponseStatus.loading:
      content = <div>Spinner</div>
      break
    case ResponseStatus.failed:
      content = <div>failed: {error}</div>
      break
    case ResponseStatus.succeeded:
      content = <TagList tags={tags} variant={TagVariant.popular} />
      break
    default:
      content = ''
  }

  return (
    <React.Fragment>
      <p>Popular Tags</p>
      {content}
    </React.Fragment>
  )
}

export default TagsPopular
