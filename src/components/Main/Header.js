import {Link} from "react-router-dom";
import logo from "../../images/logo_white.svg";

function Header({email, route, title, onClick, isLoggedIn}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <div className="header__auth">
        <p className="header__email">{email}</p>
        <Link
          to={route}
          className={`header__link ${isLoggedIn && "header__link-out"}`}
          onClick={onClick}
        >
          {title}
        </Link>
      </div>
    </header>
  );
}

export default Header;
