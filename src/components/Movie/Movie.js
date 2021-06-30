/* eslint-disable react/prop-types */
import "./Movie.css";

function Movie(props) {
  const cover = "https://api.nomoreparties.co" + props.film.image.url;
  const like = true;
  const { nameRU, duration } = props.film;

  function calculateDuration(min) {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours === 0 ? "" : hours + "ч "}${minutes}м`;
  }

  return (
    <div className='movie'>
      <img className='movie__cover' src={cover} alt={`Обложка ${nameRU}`} />
      <p className='movie__title'>{nameRU}</p>
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
