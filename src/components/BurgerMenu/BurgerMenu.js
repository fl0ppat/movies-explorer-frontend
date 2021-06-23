/* eslint-disable react/prop-types */
import "./BurgerMenu.css";
//import { useContext } from "react";
//import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import UserLink from "../UserLink/UserLink";

function BurgerMenu() {
  function closeMenu() {
    const toggler = document.querySelector("#menu__toggle");
    toggler.checked = false;
  }

  return (
    <div className='menu'>
      <input id='menu__toggle' type='checkbox' />
      <label className='menu__btn' htmlFor='menu__toggle'>
        <span></span>
      </label>
      <div onClick={closeMenu} className='menu__overlay'></div>
      <ul className='menu__box'>
        <li>
          <Link onClick={closeMenu} className='menu__item' to='/'>
            Главная
          </Link>
        </li>
        <li>
          <Link onClick={closeMenu} className='menu__item' to='/movies'>
            Фильмы
          </Link>
        </li>
        <li>
          <Link onClick={closeMenu} className='menu__item' to='/saved-movies'>
            Сохранённые фильмы
          </Link>
        </li>
        <li onClick={closeMenu}>
          <UserLink />
        </li>
      </ul>
    </div>
  );
}

export default BurgerMenu;
