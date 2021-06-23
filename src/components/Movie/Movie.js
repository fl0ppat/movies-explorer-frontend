/* eslint-disable react/prop-types */
import "./Movie.css";

function Movie(props) {
  const { cover, title, like, duration } = props.film;

  function calculateDuration(min) {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours === 0 ? "" : hours + "ч "}${minutes}м`;
  }

  return (
    <div className='movie'>
      <img className='movie__cover' src={cover} alt={`Обложка ${title}`} />
      <p className='movie__title'>{title}</p>
      {props.mode === "delete" ? (
        <button className='movie__button movie__button_delete' />
      ) : (
        <button className={`movie__button movie__button_like ${like ? "movie__button_liked" : ""}`} />
      )}
      <p className='movie__duration'>{calculateDuration(duration)}</p>
    </div>
  );
}

export default Movie;
