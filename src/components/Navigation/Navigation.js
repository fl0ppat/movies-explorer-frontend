import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../context/userContext";

import "./Navigation.css";

function Navigation() {
  const user = useContext(UserContext);
  const curRoute = useLocation().pathname;
  if (!user) return "";

  return (
    <nav className='navigation'>
      <ul className='navigation__list'>
        <li>
          <Link className={`navigation__item ${curRoute === "/movies" && "navigation__item_selected"}`} to='/movies'>
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            className={`navigation__item ${curRoute === "/saved-movies" && "navigation__item_selected"}`}
            to='/saved-movies'
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
