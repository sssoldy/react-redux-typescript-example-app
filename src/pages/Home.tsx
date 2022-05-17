import * as React from 'react'
import ArticleList from '../components/articles/ArticleList'
import FeedFilter from '../components/filter/FilterList'
import TagsPopular from '../components/tags/TagsPopular'

const Home: React.FC = () => {
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
            <FeedFilter />
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
