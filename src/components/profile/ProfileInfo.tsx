import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchProfile,
  profileWillUnmount,
  selectProfile,
  selectProfileError,
  selectProfileStatus,
} from '../../features/profile/profileSlice'
import { ResponseStatus } from '../../types/API'
import { Loading, Error, Message } from '../statusHandlers/StatusHandlers'

interface ProfileInfoProps {}

const ProfileInfo: React.FC<ProfileInfoProps> = () => {
  const { username } = useParams()

  const profile = useAppSelector(selectProfile)
  const status = useAppSelector(selectProfileStatus)
  const error = useAppSelector(selectProfileError)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (username) {
      const fetchData = dispatch(fetchProfile(username))
      return () => {
        dispatch(profileWillUnmount())
        fetchData.abort()
      }
    }
  }, [dispatch, username])

  // TODO: replace with fallback
  if (status === ResponseStatus.loading) return <Loading title="profile" />
  if (status === ResponseStatus.failed) return <Error error={error} />
  if (!profile) return <Message title="Profile not found" />

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.image} className="user-img" alt="placeholder" />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            <Link to="/register">
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {profile.username}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
