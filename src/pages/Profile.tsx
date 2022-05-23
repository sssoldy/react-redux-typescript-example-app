import * as React from 'react'
import { useAppDispatch } from '../app/hooks'
import ArticlesList from '../components/articles/ArticleList'
import ProfileTab from '../components/filterTab/ProfileTab'
import ProfileInfo from '../components/profile/ProfileInfo'
import { fetchArticles } from '../features/articles/articlesSlice'
import { useRouteFilter } from '../hooks/useRouteFilter'

const Profile: React.FC = () => {
  const filter = useRouteFilter()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchArticles(filter))
  }, [dispatch, filter])

  return (
    <div className="profile-page">
      <ProfileInfo />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ProfileTab />
            </div>
            <ArticlesList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
