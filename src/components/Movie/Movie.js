/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./Movie.css";
import currentUser from "../../context/userContext";

function Movie(props) {
  const user = useContext(currentUser);
  const { nameRU, duration, trailer, image } = props.film;
  let liked = false;

  function calculateDuration(min) {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours === 0 ? "" : hours + "ч "}${minutes}м`;
  }

  function isLiked(film) {
    if (user.movies.includes(film.movieId)) {
      liked = true;
      return true;
    } else {
      liked = false;
      return false;
    }
  }

  function handleLikeButton(event) {
    if (liked) {
      props.onDislike(props.film.movieId);
      event.target.classList.remove("movie__button_liked");
      liked = false;
    } else {
      props.onLike(props.film);
      event.target.classList.add("movie__button_liked");
      liked = true;
    }
  }

  return (
    <div className='movie'>
      <a target='_blank' href={trailer} rel='noreferrer'>
        <img className='movie__cover' src={image} alt={`Обложка ${nameRU}`} />
      </a>

      <p className='movie__title'>{nameRU}</p>
      {props.mode ? (
        <button
          className='movie__button movie__button_delete'
          onClick={(e) => {
            props.onDislike(props.film.movieId, e.target);
          }}
        />
      ) : (
        <button
          className={`movie__button movie__button_like ${isLiked(props.film) && "movie__button_liked"}`}
          onClick={(e) => {
            handleLikeButton(e);
          }}
        />
      )}
      <p className='movie__duration'>{calculateDuration(duration)}</p>
    </div>
  );
}

export default Movie;
