import * as React from 'react'
import { NavLink } from 'react-router-dom'

interface NavItemProps {
  to: string
  icon?: string
  title: string
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, title }) => {
  const content = icon ? (
    <React.Fragment>
      <i className={icon}></i>&nbsp;{title}
    </React.Fragment>
  ) : (
    title
  )

  return (
    <li className="nav-item">
      <NavLink
        className={`nav-link ${(isActive: boolean) =>
          isActive ? 'active' : ''}`}
        to={to}
      >
        {content}
      </NavLink>
    </li>
  )
}

export default NavItem
