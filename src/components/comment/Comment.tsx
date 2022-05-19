import * as React from 'react'
import { Link } from 'react-router-dom'
import { IComment } from '../../types/comment'
import { formatDateComment } from '../../utils/misc'

interface CommentProps {
  comment: IComment
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { author } = comment
  const postedDate = formatDateComment(comment.createdAt)

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`../profile/${author.username}`} className="comment-author">
          <img
            alt={author.username}
            src={author.image}
            className="comment-author-img"
          />
        </Link>
        &nbsp;
        <Link to={`../profile/${author.username}`} className="comment-author">
          {author.username}
        </Link>
        <span className="date-posted">{postedDate}</span>
      </div>
    </div>
  )
}

export default Comment
