import { Link } from "react-router-dom";

import "./Navigation.css";

function Navigation() {
  return (
    <nav className='navigation'>
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <Link className='navigation__link' to='/movies'>
            Фильмы
          </Link>
        </li>
        <li className='navigation__item navigation__item_selected'>
          <Link className='navigation__link' to='/saved-movies'>
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
