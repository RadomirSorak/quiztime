/** @format */

import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Header({ onTitleClick }) {
  const { isAuth, logout } = useContext(AuthContext);
  const history = useHistory();

  return (
    <header className="header">
      <h1 className="title" onClick={onTitleClick}>
        <Link to="/">Quiz Time</Link>
      </h1>
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
              onClick={() => history.push("/login")}
            >
              Log In
            </button>
            <button
              className="login-btn"
              type="button"
              onClick={() => history.push("/contact")}
            >
              Register
            </button>
          </div>
        )}
      </nav>
      <hr className="break" />
    </header>
  );
}

export default Header;
