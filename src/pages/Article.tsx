import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import TagList from '../components/tags/TagList'
import CommentList from '../components/comment/CommentList'
import { TagVariant } from '../types/tag'
import { formatDate } from '../utils/misc'
import {
  articleWillUnmount,
  fetchArticle,
} from '../features/article/articleSlice'
import { ResponseStatus } from '../types/API'

const Article: React.FC = () => {
  // TODO: research a better solution https://github.com/remix-run/react-router/issues/8200
  const { slug } = useParams() as { slug: string }

  const article = useAppSelector(state => state.article.article)
  const status = useAppSelector(state => state.article.status)
  const error = useAppSelector(state => state.article.error)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const fetchData = dispatch(fetchArticle(slug))
    return () => {
      dispatch(articleWillUnmount())
      fetchData.abort()
    }
  }, [dispatch, slug])

  // TODO: Refactor it
  if (status === ResponseStatus.loading)
    return <div className="article-preview">Loading articles...</div>
  if (status === ResponseStatus.failed)
    return <div className="article-preview">Error: {error}</div>
  if (!article) return <div className="article-preview">Nothing found</div>

  const { author } = article

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <div className="article-meta">
            <Link to={`/profile/${author.username}`}>
              <img src={author.image} alt={author.username} />
            </Link>
            <div className="info">
              <Link to={`/profile/${author.username}`} className="author">
                {author.username}
              </Link>
              <span className="date">{formatDate(article.createdAt)}</span>
            </div>
            <Link to="/register">
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {author.username}
              </button>
            </Link>
            &nbsp;&nbsp;
            <Link to="/register">
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; Favorite Article{' '}
                <span className="counter">({article.favoritesCount})</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
          </div>
        </div>

        <TagList tags={article.tagList} variant={TagVariant.article} />

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link to={`/profile/${author.username}`}>
              <img src={author.image} alt={author.username} />
            </Link>
            <div className="info">
              <Link to={`/profile/${author.username}`} className="author">
                {author.username}
              </Link>
              <span className="date">{formatDate(article.createdAt)}</span>
            </div>
            <Link to="/register">
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {author.username}
              </button>
            </Link>
            &nbsp;
            <Link to="/register">
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; Favorite Article{' '}
                <span className="counter">({article.favoritesCount})</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <p>
              <Link to="/login">Sign in</Link> or{' '}
              <Link to="/register">sign up</Link> to add comments on this
              article.
            </p>
            <CommentList slug={slug} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
