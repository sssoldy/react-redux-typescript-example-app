import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ResponseStatus } from '../../types/API'
import ArticleExcerpt from './ArticleExcerpt'
import {
  fetchArticles,
  SelectArticlesError,
  SelectArticlesIds,
  SelectArticlesStatus,
} from './articlesSlice'

const ArticlesList: React.FC = () => {
  const articlesIds = useAppSelector(SelectArticlesIds)
  const error = useAppSelector(SelectArticlesError)
  const status = useAppSelector(SelectArticlesStatus)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (status === ResponseStatus.idle) {
      dispatch(fetchArticles())
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
      content = articlesIds.map(id => (
        <ArticleExcerpt key={id} articleId={id} />
      ))
      break
    default:
      content = ''
  }

  return <React.Fragment>{content}</React.Fragment>
}

export default ArticlesList
