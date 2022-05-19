import * as React from 'react'
import { useAsync } from '../../hooks/useAsync'
import { getComments } from '../../services/conduit'
import { IComments } from '../../types/comment'
import Comment from './Comment'

interface CommentListProps {
  slug: string
}

const CommentList: React.FC<CommentListProps> = ({ slug }) => {
  let { data, error, run, isLoading, isError } = useAsync<IComments>()

  React.useEffect(() => {
    if (!slug) {
      return
    }
    run(getComments(slug))
  }, [run, slug])

  // TODO: Refactor it
  if (isLoading)
    return <div className="article-preview">Loading comments...</div>
  if (isError) return <div className="article-preview">Error: {error}</div>
  if (!data || !data.comments.length)
    return (
      <div className="article-preview">
        Be the first to share what you think!
      </div>
    )

  return (
    <React.Fragment>
      {data.comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </React.Fragment>
  )
}

export default CommentList
