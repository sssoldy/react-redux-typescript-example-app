import * as React from 'react'
import { useAppDispatch } from '../app/hooks'
import ArticleList from '../components/articles/ArticleList'
import GlobalTab from '../components/filterTab/GlobalTab'
import TagsPopular from '../components/tags/TagsPopular'
import { fetchArticles } from '../features/articles/articlesSlice'
import { useRouteFilter } from '../hooks/useRouteFilter'

const Home: React.FC = () => {
  const filter = useRouteFilter()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchArticles(filter))
  }, [dispatch, filter])

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <GlobalTab />
            </div>
            <ArticleList />
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <TagsPopular />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
