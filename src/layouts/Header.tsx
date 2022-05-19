import * as React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/navigation/NavBar'

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <NavBar />
      </div>
    </nav>
  )
}

export default Header
