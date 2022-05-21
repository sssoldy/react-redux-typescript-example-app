import * as React from 'react'
import { useAsync } from '../../hooks/useAsync'
import { getComments } from '../../services/conduit'
import { IComments } from '../../types/comment'
import { Loading, Error, Message } from '../statusHandlers/StatusHandlers'
import Comment from './Comment'

interface CommentListProps {
  slug: string
}

const CommentList: React.FC<CommentListProps> = ({ slug }) => {
  const { data, error, run, isLoading, isError } = useAsync<IComments>()

  React.useEffect(() => {
    run(getComments(slug))
  }, [run, slug])

  if (isLoading) return <Loading title="comments" />
  if (isError) return <Error error={error} />
  if (!data || !data.comments.length)
    return <Message title="Be the first to share what you think!" />

  return (
    <React.Fragment>
      {data.comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </React.Fragment>
  )
}

export default CommentList
