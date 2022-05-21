import * as React from 'react'
import { ITags, TagVariant } from '../../types/tag'
import TagList from './TagList'
import { useAsync } from '../../hooks/useAsync'
import { getTags } from '../../services/conduit'
import { Loading, Error, Message } from '../statusHandlers/StatusHandlers'

const TagsPopular: React.FC = () => {
  const { data, error, run, isLoading, isError } = useAsync<ITags>()
  React.useEffect(() => {
    run(getTags())
  }, [run])

  if (isLoading) return <Loading title="tags" />
  if (isError) return <Error error={error} />
  if (!data || !data.tags.length) return <Message title="Nothing found" />

  return (
    <React.Fragment>
      <TagList tags={data.tags} variant={TagVariant.popular} />
    </React.Fragment>
  )
}

export default TagsPopular
