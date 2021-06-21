import "./Carousel.css";

function Carousel() {
  return (
    <section className='carousel'>
      <h1 className='carousel__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <ul className='carousel__link-list'>
        <li className='carousel__item'>О проекте</li>
        <li className='carousel__item'>Технологии</li>
        <li className='carousel__item'>Студент</li>
      </ul>
    </section>
  );
}

export default Carousel;
