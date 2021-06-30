import { withRouter } from "react-router";
import Search from "../Search/Search";
import MoviesList from "../MoviesList/MoviesList";
import fetchAllFilms from "../../utils/MoviesApi";
import useWindowSize from "../../utils/useWindowWidth";
import { ModalContext } from "../../context/modalContext";

import Preloader from "../Preloader/Preloader";

import { useState, useContext, useRef } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);
  let { handleModal, closeModal } = useContext(ModalContext);

  const MoviesRef = useRef();
  const screenWidth = useWindowSize();

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
          console.error("Ошибка во время загрузки данных: " + e);
          closeModal(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
            true
          );
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
    console.log(filterObj);
    let filtredArray;
    filtredArray = filmList.filter((film) => {
      return film.nameRU.toLowerCase().includes(filterObj.text.toLowerCase());
    });
    if (filterObj.short === true) {
      filtredArray = filtredArray.filter((film) => Number(film.duration) <= 40);
    }
    console.log(filterObj, filtredArray);
    return filtredArray;
  }

  return (
    <>
      <Search onSearch={onSearch} />
      <MoviesList ref={MoviesRef} movies={movies} cardsOnScreen={getAmoutOfCards()} />
    </>
  );
}
export default withRouter(Movies);
