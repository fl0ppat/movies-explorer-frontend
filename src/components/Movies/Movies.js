/* eslint-disable react/prop-types */
import { useState, useContext, useRef, useEffect, useLayoutEffect } from "react";
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
  let { handleModal, closeModal } = useContext(ModalContext);
  const curRoute = useLocation().pathname;

  const MoviesRef = useRef();
  const screenWidth = useWindowSize();
  const user = useContext(currentUser);

  function parseRawMovieObj(movie) {
    const { country = "Мир", director = "Режиссёр", duration = 1, year, description, image, nameRU, nameEN } = movie;
    const preparedMovie = {
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
    };
    return preparedMovie;
  }

  useEffect(() => {
    MoviesRef.current.cleanAllCards();
  }, [curRoute]);

  useLayoutEffect(() => {
    if (user) {
      onSearch();
    }
  }, [user]);

  function onLike(movie) {
    mainApi
      .likeFilm(movie)
      .then(() => {
        props.onLike(movie.movieId);
      })
      .catch((e) => console.error(e));
  }

  function onDislike(id, element) {
    mainApi
      .deleteFilm(id)
      .then(() => {
        if (element) element.parentElement.style.display = "none";

        props.onDislike(id);
      })
      .catch((e) => console.error(e));
  }

  function getLikedMovies() {
    if (user === null) return [];
    const userMovies = user.movies;
    const likedMovies = movies.filter((item) => userMovies.indexOf(item.movieId) > -1);
    return likedMovies;
  }

  function getAmoutOfCards() {
    if (screenWidth.width > 768) return { size: 12, load: 3 };
    if (screenWidth.width < 768 && screenWidth.width >= 600) return { size: 8, load: 2 };
    else return { size: 5, load: 1 };
  }

  function onSearch(query) {
    let searchParams = query;

    if (searchParams === undefined) {
      const storage = window.localStorage.getItem("query");
      if (storage) searchParams = JSON.parse(storage);
    } else {
      searchParams = query;
    }

    MoviesRef.current.cleanAllCards();
    const movies = localStorage.getItem("movies");
    if (movies === null) {
      handleModal(<Preloader />, false);
      fetchAllFilms()
        .then((res) => {
          const parsedMovies = res.map((movie) => parseRawMovieObj(movie));
          localStorage.setItem("movies", JSON.stringify(parsedMovies));
          setTimeout(closeModal, 300);
          return setMovies(filterFilm(parsedMovies, searchParams));
        })
        .catch((e) => {
          handleModal(<h2 className='modal__title'>Ошибка во время загрузки данных</h2>, true);
          console.error("Ошибка во время загрузки данных: " + e);
        });
    } else {
      setTimeout(closeModal, 300);
      const currentMovies = filterFilm(JSON.parse(movies), searchParams);
      if (query) window.localStorage.setItem("query", JSON.stringify(query));

      return setMovies(currentMovies);
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
    if (!filterObj) {
      return [];
    }
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
        deleteMode={curRoute === "/saved-movies"}
        onLike={onLike}
        onDislike={onDislike}
        cardsOnScreen={getAmoutOfCards()}
      />
    </>
  );
}
export default withRouter(Movies);
