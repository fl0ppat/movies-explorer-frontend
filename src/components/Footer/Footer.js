import "./Footer.css";

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__annotation'>Учебный проект Яндекс.Практикум х BeatFilm.</p>

      <div className='footer__row'>
        <p className='footer__date'>@ 2021</p>
        <ul className='footer__links'>
          <a className='footer__link'>
            <li>Яндекс.Практикум</li>
          </a>
          <a className='footer__link'>
            <li>Github</li>
          </a>
          <a className='footer__link'>
            <li>Facebook</li>
          </a>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
