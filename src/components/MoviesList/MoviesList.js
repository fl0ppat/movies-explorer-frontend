/* eslint-disable react/prop-types */
import Movie from "../Movie/Movie";
import "./MoviesList.css";

function MoviesList(props) {
  const movies = props.movies;
  return (
    <>
      <section className='movies-list'>
        {movies.map((film, i) => (
          <Movie mode={props.mode} key={i} film={film} />
        ))}
      </section>
      {props.more && <button className='movies-list__loadmore'>Ещё</button>}
    </>
  );
}

export default MoviesList;
