/* eslint-disable react/prop-types */
import { useContext } from "react";

import Navigation from "../Navigation/Navigation";
import profileImg from "../../images/icon__profile.svg";
import logoImage from "../../images/logo.svg";
import UserContext from "../../context/userContext";

import { Link, useLocation } from "react-router-dom";

import "./Header.css";

function Header() {
  const user = useContext(UserContext);
  const curRoute = useLocation().pathname;
  if (curRoute === "/movies" || curRoute === "/saved-movies" || curRoute === "/" || curRoute === "/profile") {
    return (
      <header className='header'>
        <Link className='header__logo-link' to='/'>
          <img className='header__logo' src={logoImage} alt='Логотип' />
        </Link>
        <Navigation />
        {user ? (
          <Link className='header__profile' to='/profile'>
            Аккаунт
            <img className='header__pic' src={profileImg} alt='Изображение профиля' />
          </Link>
        ) : (
          <span>
            <Link className='header__signup' to='/signup'>
              Регистрация
            </Link>
            <Link className='header__signin' to='/signin'>
              Войти
            </Link>
          </span>
        )}
      </header>
    );
  } else return "";
}

export default Header;
