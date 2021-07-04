/* eslint-disable react/prop-types */
import { useState, useContext, useRef, useEffect } from "react";
import { withRouter, useLocation } from "react-router";
import Search from "../Search/Search";
import MoviesList from "../MoviesList/MoviesList";
import fetchAllFilms from "../../utils/MoviesApi";
import useWindowSize from "../../utils/useWindowWidth";
import { ModalContext } from "../../context/modalContext";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";
import constants from "../../utils/constants";
import currentUser from "../../context/userContext";

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const user = useContext(currentUser);
  let { handleModal, closeModal } = useContext(ModalContext);
  const curRoute = useLocation().pathname;

  const MoviesRef = useRef();
  const screenWidth = useWindowSize();

  useEffect(() => {
    MoviesRef.current.cleanAllCards();
  }, [curRoute]);

  function onLike(movie) {
    const { country, director, duration, year, description, image, nameRU, nameEN } = movie;
    mainApi
      .likeFilm({
        country,
        director,
        duration,
        year,
        description,
        image: constants.imageLink + image.url,
        trailer: movie.trailerLink,
        nameRU,
        nameEN,
        thumbnail: constants.imageLink + image.url,
        movieId: movie.id,
      })
      .then(() => {
        props.onLike(movie.id);
      })
      .catch((e) => console.error(e));
  }

  function onDislike(id) {
    mainApi
      .deleteFilm(id)
      .then(() => {
        props.onDislike(id);
      })
      .catch((e) => console.error(e));
  }

  function getLikedMovies() {
    if (user === null) return [];
    const userMovies = user.movies;
    const likedMovies = movies.filter((item) => userMovies.indexOf(item.id) > -1);
    return likedMovies;
  }

  function getAmoutOfCards() {
    if (screenWidth.width > 768) return { size: 12, load: 3 };
    if (screenWidth.width < 768 && screenWidth.width >= 600) return { size: 8, load: 2 };
    else return { size: 5, load: 1 };
  }

  function onSearch(searchParams) {
    handleModal(<Preloader />, false);

    MoviesRef.current.cleanAllCards();
    const movies = localStorage.getItem("movies");

    if (movies === null) {
      fetchAllFilms()
        .then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
          setTimeout(closeModal, 300);
          return setMovies(filterFilm(res, searchParams));
        })
        .catch((e) => {
          handleModal(<h2 className='modal__title'>Ошибка во время загрузки данных</h2>, true);
          console.error("Ошибка во время загрузки данных: " + e);
        });
    } else {
      setTimeout(closeModal, 300);
      return setMovies(filterFilm(JSON.parse(movies), searchParams));
    }
  }

  /**
   * Filter films with query params
   *
   * @param {Array} filmList
   * @param {Object} filterObj
   * @param {String} filterObj.text search substring
   * @param {Boolean} filterObj.short if true show only duration < 40
   */
  function filterFilm(filmList, filterObj) {
    let filtredArray;
    filtredArray = filmList.filter((film) => {
      return film.nameRU.toLowerCase().includes(filterObj.text.toLowerCase());
    });
    if (filterObj.short === true) {
      filtredArray = filtredArray.filter((film) => Number(film.duration) <= 40);
    }
    return filtredArray;
  }

  return (
    <>
      <Search onSearch={onSearch} />
      <MoviesList
        ref={MoviesRef}
        movies={curRoute === "/movies" ? movies : getLikedMovies()}
        mode={curRoute === "/saved-movies"}
        onLike={onLike}
        onDislike={onDislike}
        cardsOnScreen={getAmoutOfCards()}
      />
    </>
  );
}
export default withRouter(Movies);
