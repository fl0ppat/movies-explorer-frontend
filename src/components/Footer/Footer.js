import { useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const curRoute = useLocation().pathname;

  if (curRoute === "/movies" || curRoute === "/saved-movies" || curRoute === "/") {
    return (
      <footer className='footer'>
        <p className='footer__annotation'>Учебный проект Яндекс.Практикум х BeatFilm.</p>

        <div className='footer__row'>
          <p className='footer__date'>@ 2021</p>
          <ul className='footer__links'>
            <a href='https://praktikum.yandex.ru/' rel='noreferrer' target='_blank' className='footer__link'>
              <li>Яндекс.Практикум</li>
            </a>
            <a href='https://github.com/torvalds' rel='noreferrer' target='_blank' className='footer__link'>
              <li>Github</li>
            </a>
            <a href='https://ru-ru.facebook.com/zuck' rel='noreferrer' target='_blank' className='footer__link'>
              <li>Facebook</li>
            </a>
          </ul>
        </div>
      </footer>
    );
  } else return "";
}

export default Footer;
