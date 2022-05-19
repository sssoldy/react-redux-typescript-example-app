import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ResponseStatus } from '../../types/API'
import ArticleExcerpt from './ArticleExcerpt'
import {
  fetchArticles,
  selectArticlesError,
  selectArticlesIds,
  selectArticlesStatus,
} from '../../features/articles/articlesSlice'
import { selectFilters } from '../../features/filters/filtersSlice'

const ArticlesList: React.FC = () => {
  const articlesIds = useAppSelector(selectArticlesIds)
  // const articlesIds: Array<EntityId> = []
  const error = useAppSelector(selectArticlesError)
  const status = useAppSelector(selectArticlesStatus)
  const filter = useAppSelector(selectFilters)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchArticles(filter))
  }, [dispatch, filter])

  // TODO: Refactor it
  if (status === ResponseStatus.loading)
    return <div className="article-preview">Loading articles...</div>
  if (status === ResponseStatus.failed)
    return <div className="article-preview">Error: {error}</div>
  if (articlesIds.length === 0)
    return <div className="article-preview">Nothing found</div>

  return (
    <React.Fragment>
      {articlesIds &&
        articlesIds.map(id => <ArticleExcerpt key={id} articleId={id} />)}
    </React.Fragment>
  )
}

export default ArticlesList
