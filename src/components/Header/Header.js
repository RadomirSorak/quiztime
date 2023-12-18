/** @format */

import './Header.css'
import { Link, useHistory } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Header() {
  const { isAuth, logout } = useContext(AuthContext)
  const history = useHistory()

  return (
    <header className="header">
      <Link to="/" className="title">
        Quiz Time
      </Link>
      <nav className="nav-bar">
        {isAuth ? (
          <button className="log-out" type="button" onClick={logout}>
            Log Out
          </button>
        ) : (
          <div>
            <button
              className="login-btn"
              type="button"
              onClick={() => history.push('/login')}>
              Log in
            </button>
          </div>
        )}
      </nav>
      <hr className="break" />
    </header>
  )
}

export default Header
