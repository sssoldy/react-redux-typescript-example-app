import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { baseFilter } from '../../config/settings'
import { fetchArticles } from '../../features/articles/articlesSlice'
import { selectProfile } from '../../features/profile/profileSlice'
import { selectUser } from '../../features/user/userSlice'
import { IProfile } from '../../types/profile'
import { IUser } from '../../types/user'
import { Error } from '../statusHandlers/StatusHandlers'
import FilterItem from './FilterItem'

const ProfileTab: React.FC = () => {
  const profile = useAppSelector(selectProfile)
  const user = useAppSelector(selectUser)

  let curUsername: IUser | IProfile

  if (!user && profile) {
    curUsername = profile
  } else if (user && profile) {
    const isUser = profile.username === user.username
    curUsername = isUser ? user : profile
  } else {
    return <Error error="Profile page check nulls" />
  }

  const profileTab = (
    <FilterItem
      filter={{ ...baseFilter, author: curUsername.username }}
      onClick={() =>
        fetchArticles({ ...baseFilter, author: curUsername.username })
      }
    >
      {curUsername.username}`s Articles
    </FilterItem>
  )

  const favoriteTab = (
    <FilterItem
      filter={{ ...baseFilter, favorited: curUsername.username }}
      onClick={() =>
        fetchArticles({ ...baseFilter, favorited: curUsername.username })
      }
    >
      Favorited Articles
    </FilterItem>
  )

  return (
    <ul className="nav nav-pills outline-active">
      {profileTab}
      {favoriteTab}
    </ul>
  )
}
export default ProfileTab
