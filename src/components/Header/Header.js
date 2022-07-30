import "./Header.css";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
        <Link to="/" className="title">
            Quiz Time
        </Link>
        <hr className="break"/>
        </div>
    );
}

export default Header;