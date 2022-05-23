import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { baseFilter } from '../../config/settings'
import {
  fetchArticles,
  selectArticlesFilter,
} from '../../features/articles/articlesSlice'
import { selectProfile } from '../../features/profile/profileSlice'
import FilterItem from './FilterItem'

interface ProfileTabProps {}

const ProfileTab: React.FC<ProfileTabProps> = () => {
  const filter = useAppSelector(selectArticlesFilter)
  const profile = useAppSelector(selectProfile)

  // TODO: add profile/user variations
  const profileTab = (
    <FilterItem
      filter={{ ...baseFilter, author: filter.author }}
      onClick={() => fetchArticles({ ...baseFilter, author: filter.author })}
    >
      {profile && profile.username}`s Articles
    </FilterItem>
  )

  const favoriteTab = (
    <FilterItem
      filter={{ ...baseFilter, favorited: filter.author }}
      onClick={() => fetchArticles({ ...baseFilter, favorited: filter.author })}
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
