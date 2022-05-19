import * as React from 'react'
import { ITags, TagVariant } from '../../types/tag'
import TagList from './TagList'
import { useAsync } from '../../hooks/useAsync'
import { getTags } from '../../services/conduit'

const TagsPopular: React.FC = () => {
  const { data, error, run, isLoading, isError } = useAsync<ITags>()
  React.useEffect(() => {
    run(getTags())
  }, [run])

  // // TODO: Refactor it
  if (isLoading) return <div>Loading tags...</div>
  if (isError) return <div>Error: {error}</div>
  if (!data || !data.tags.length) return <div>Nothing found</div>

  return (
    <React.Fragment>
      <TagList tags={data.tags} variant={TagVariant.popular} />
    </React.Fragment>
  )
}

export default TagsPopular
