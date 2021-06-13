import "./Carousel.css";

function Carousel() {
  return (
    <section className='carousel'>
      <h1 className='carousel__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <ul className='carousel__link-list'>
        <li className='carousel__item'>
          <a>О проекте</a>
        </li>
        <li className='carousel__item'>
          <a>Технологии</a>
        </li>
        <li className='carousel__item'>
          <a>Студент</a>
        </li>
      </ul>
    </section>
  );
}

export default Carousel;
