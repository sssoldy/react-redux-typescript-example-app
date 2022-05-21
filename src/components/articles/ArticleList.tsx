import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { ResponseStatus } from '../../types/API'
import ArticleExcerpt from './ArticleExcerpt'
import {
  selectArticlesError,
  selectArticlesIds,
  selectArticlesStatus,
} from '../../features/articles/articlesSlice'
import { Loading, Error, Message } from '../statusHandlers/StatusHandlers'

const ArticlesList: React.FC = () => {
  const articlesIds = useAppSelector(selectArticlesIds)
  const error = useAppSelector(selectArticlesError)
  const status = useAppSelector(selectArticlesStatus)

  if (status === ResponseStatus.loading) return <Loading title="Articles" />
  if (status === ResponseStatus.failed) return <Error error={error} />
  if (!articlesIds.length) return <Message title="Nothing found" />

  return (
    <React.Fragment>
      {articlesIds.map(id => (
        <ArticleExcerpt key={id} articleId={id} />
      ))}
    </React.Fragment>
  )
}

export default ArticlesList
