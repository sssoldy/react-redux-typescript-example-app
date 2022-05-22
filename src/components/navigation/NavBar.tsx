import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import NavItem from './NavItem'

const NavBar: React.FC = () => {
  const isLoggenIn = useAppSelector(state => state.user.isLoggedIn)

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <NavItem to="/" title="Home" />

      {isLoggenIn ? (
        <React.Fragment>
          <NavItem to="/placeholder" icon="ion-compose" title="New Article" />
          <NavItem to="/settings" icon="ion-gear-a" title="Settings" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavItem to="/login" title="Sign in" />
          <NavItem to="/register" title="Sign up" />
        </React.Fragment>
      )}
    </ul>
  )
}

export default NavBar
