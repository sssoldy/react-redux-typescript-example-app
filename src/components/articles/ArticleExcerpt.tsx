import { EntityId } from '@reduxjs/toolkit'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { TagVariant } from '../../types/tag'
import { formatDate } from '../../utils/misc'
import TagList from '../tags/TagList'
import { selectArticleById } from '../../features/articles/articlesSlice'

interface ArticleExcerptProps {
  articleId: EntityId
}

const ArticleExcerpt: React.FC<ArticleExcerptProps> = ({ articleId }) => {
  const article = useAppSelector(state => selectArticleById(state, articleId))

  // TODO: Add error handler
  if (!article)
    return <div className="article-preview">Something went wrong</div>

  const { author } = article

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`profile/${author.username}`}>
          <img src={author.image} alt={author.username} />
        </Link>
        <div className="info">
          <Link to={`profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{formatDate(article.createdAt)}</span>
        </div>
        <Link to="/register">
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </Link>
      </div>
      <Link to={`article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tags={article.tagList} variant={TagVariant.article} />
      </Link>
    </div>
  )
}

export default ArticleExcerpt
