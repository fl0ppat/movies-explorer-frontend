import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <section className='notfound'>
      <h1 className='notfound__title'>404</h1>
      <p className='notfound__text'>Страница не найдена</p>
      <Link className='notfound__link' to='/'>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
