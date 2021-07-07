/* eslint-disable react/prop-types */

import Navigation from "../Navigation/Navigation";
import logoImage from "../../images/logo.svg";
import useWindowSize from "../../utils/useWindowWidth";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import UserLink from "../UserLink/UserLink";

import { Link, useLocation } from "react-router-dom";

import "./Header.css";

function Header(props) {
  const user = props.loggedIn;
  const curRoute = useLocation().pathname;
  const { width } = useWindowSize();

  if (curRoute === "/movies" || curRoute === "/saved-movies" || curRoute === "/" || curRoute === "/profile") {
    if (width <= 768) {
      return (
        <header className='header'>
          <Link className='header__logo-link' to='/'>
            <img className='header__logo' src={logoImage} alt='Логотип' />
          </Link>
          {user ? (
            <BurgerMenu />
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
    }

    return (
      <header className='header'>
        <Link className='header__logo-link' to='/'>
          <img className='header__logo' src={logoImage} alt='Логотип' />
        </Link>
        <Navigation loggedIn={props.loggedIn} />
        {user ? (
          <UserLink />
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
