import * as React from 'react'
import NavBar from '../navigation/NavBar'

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavBar />
      </div>
    </nav>
  )
}

export default Header
