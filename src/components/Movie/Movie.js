import "./Movie.css";

function Movie(props) {
  // eslint-disable-next-line react/prop-types
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
      <button className={`movie__like ${like ? "movie__like_liked" : ""}`} />
      {like}
      <p className='movie__duration'>{calculateDuration(duration)}</p>
    </div>
  );
}

export default Movie;
