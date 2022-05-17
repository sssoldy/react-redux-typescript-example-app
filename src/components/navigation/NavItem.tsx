import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavItemProps {
  to: string
  children: React.ReactNode
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  const { pathname } = useLocation()
  const isActive = to === pathname

  return (
    <li className="nav-item">
      <Link className={`nav-link ${isActive ? 'active' : ''}`} to={to}>
        {children}
      </Link>
    </li>
  )
}

export default NavItem
