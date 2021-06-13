import Navigation from "../Navigation/Navigation";
import profileImg from "../../images/icon__profile.svg";
import logoImage from "../../images/logo.svg";

import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
  return (
    <header className='header'>
      <Link className='header__logo-link' to='/'>
        <img className='header__logo' src={logoImage} alt='Логотип' />
      </Link>
      <Navigation />
      <Link className='profile' to='/profile'>
        Аккаунт
        <img className='profile__pic' src={profileImg} alt='Изображение профиля' />
      </Link>
    </header>
  );
}

export default Header;
