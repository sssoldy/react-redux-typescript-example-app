import * as React from 'react'
import NavItem from './NavItem'

const NavBar: React.FC = () => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <NavItem to="/">Home</NavItem>
      {/* <NavItem to="/">
        <i className="ion-compose"></i>&nbsp;New Article
      </NavItem>
      <NavItem to="/">
        <i className="ion-gear-a"></i>&nbsp;Settings
      </NavItem> */}
      <NavItem to="/login">Sign in</NavItem>
      <NavItem to="/register">Sign up</NavItem>
    </ul>
  )
}

export default NavBar
