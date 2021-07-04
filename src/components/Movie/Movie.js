/* eslint-disable react/prop-types */
import { useContext } from "react";
import consts from "../../utils/constants";
import "./Movie.css";
import currentUser from "../../context/userContext";

function Movie(props) {
  const user = useContext(currentUser);
  const cover = consts.imageLink + props.film.image.url;
  const { nameRU, duration, trailerLink } = props.film;

  function calculateDuration(min) {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours === 0 ? "" : hours + "ч "}${minutes}м`;
  }

  function isLiked(film) {
    if (user.movies.includes(film.id)) return true;
    return false;
  }

  return (
    <div className='movie'>
      <a target='_blank' href={trailerLink} rel='noreferrer'>
        <img className='movie__cover' src={cover} alt={`Обложка ${nameRU}`} />
      </a>

      <p className='movie__title'>{nameRU}</p>
      {props.mode ? (
        <button
          className='movie__button movie__button_delete'
          onClick={async (e) => {
            props.onDislike(props.film.id);
            await e.target.parentElement.remove();
          }}
        />
      ) : isLiked(props.film) ? (
        <button
          className='movie__button movie__button_like movie__button_liked'
          onClick={async (e) => {
            props.onDislike(props.film.id);
            await e.target.classList.remove("movie__button_liked");
          }}
        />
      ) : (
        <button
          className='movie__button movie__button_like'
          onClick={(e) => {
            props.onLike(props.film);
            e.target.classList.add("movie__button_liked");
          }}
        />
      )}
      <p className='movie__duration'>{calculateDuration(duration)}</p>
    </div>
  );
}

export default Movie;
