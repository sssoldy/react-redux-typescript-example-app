import * as React from 'react'
import ArticleList from '../articles/ArticleList'
import TagsPopular from '../tags/TagsPopular'

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
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="/">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>
            <ArticleList />
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <TagsPopular />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home