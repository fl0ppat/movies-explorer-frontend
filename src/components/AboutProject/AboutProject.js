import "./AboutProject.css";

function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='section__title'>О проекте</h2>
      <hr />
      <div className='about-project__grid'>
        <div className='about-project__item-left'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__item-right'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className='about-project__item-center'>
          <div className='about-project__back-block'>1 неделя</div>
          <div className='about-project__back-tooltip'>Back-end</div>
          <div className='about-project__front-block'>4 недели</div>
          <div className='about-project__front-tooltip'>Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
