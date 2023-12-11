import "./Header.css";
import {Link, useHistory} from "react-router-dom";
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function Header() {

    const { isAuth, logout } = useContext(AuthContext);
    const history = useHistory();
    console.log(history);

    return (
        <header className="header">
            <Link to="/" className="title">
                    Quiz Time
            </Link>
                <nav className="nav-bar">
            {isAuth ?
                <button
                    className="log-out"
                    type="button"
                    onClick={logout}
                >
                    Log Out
                </button>
                :
                <div>
                    <button
                        className="login-btn"
                        type="button"
                        onClick={() => history.push('/login')}
                    >
                        Log In
                    </button>
                    <button
                        className="login-btn"
                        type="button"
                        onClick={() => history.push('/contact')}
                    >
                        Register
                    </button>
                </div>
            }
                </nav>
            <hr className="break"/>
        </header>

    );
}

export default Header;