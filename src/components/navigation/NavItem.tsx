import * as React from 'react'
import { NavLink } from 'react-router-dom'

interface NavItemProps {
  to: string
  children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  return (
    <li className="nav-item">
      <NavLink
        className={`nav-link ${(isActive: boolean) =>
          isActive ? 'active' : ''}`}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  )
}

export default NavItem
