import * as React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* TODO: Add "active" className when you're on that page */}
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="ion-compose"></i>&nbsp;New Article
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="ion-gear-a"></i>&nbsp;Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
