import "./AboutMe.css";
import image from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='section__title'>Студент</h2>
      <hr />
      <img className='about-me__image' alt='Фото студента' src={image} />
      <div className='about-me__info'>
        <h3 className='about-me__title'>Виталий</h3>
        <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
        <p className='about-me__paragraph'>
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать
          музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
          как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <ul className='about-me__social-links'>
          <li className='about-me__social-link'>
            <a href='https://ru-ru.facebook.com/zuck' rel='noreferrer' target='_blank'>
              Facebook
            </a>
          </li>
          <li className='about-me__social-link'>
            <a href='https://github.com/torvalds' rel='noreferrer' target='_blank'>
              Github
            </a>
          </li>
        </ul>
      </div>

      <div className='about-me__portfolio'>
        <h4 className='about-me__portfolio-title'>Портфолио</h4>
        <ul className='about-me__portfolio-links'>
          <li className='about-me__portfolio-link'>
            <a href='https://github.com/fl0ppat/how-to-learn' rel='noreferrer' target='_blank'>
              Статичный сайт
            </a>
          </li>
          <li className='about-me__portfolio-link'>
            <a href='https://fl0ppat.github.io/russian-travel/' rel='noreferrer' target='_blank'>
              Адаптивный сайт
            </a>
          </li>
          <li className='about-me__portfolio-link'>
            <a href='https://github.com/fl0ppat/react-mesto-api-full' rel='noreferrer' target='_blank'>
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;
